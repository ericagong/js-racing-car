## 📄 1분 요약

안녕하세요 멘토님, 가감 없는 피드백 부탁드립니다 🥊

[step3 피드백](https://github.com/ericagong/js-racing-car/pull/3)을 바탕으로 최종 리팩토링을 진행했습니다.

1년이 지난 지금,
step3 코드를 다시 들여다보면서, 불편한 지점을 여러 개 마주했습니다.

- MoveStrategy 추상 클래스가 테스트를 어렵게 만들고 있었고
- 커버리지 100%를 채워도 "이 테스트가 진짜 의미 있나?" 하는 찜찜함이 남았고
- 코드를 처음 보는 사람에게 "이 프로젝트가 뭘 하는 건지" 설명하기가 어려웠고
- MVC라고 나눴는데, 이 프로젝트에서 Controller가 왜 필요한지 설명하지 못했습니다. 입력 받고 → 게임 돌리고 → 결과 출력하는 순차 흐름인데, 굳이 Controller라는 이름을 붙여야 했을까?

이 불편함들은 하나의 공통된 원인을 가지고 있었습니다.

> **패턴(MVC), 수치(커버리지), 구조(추상 클래스) — 전부 수단인데, 목적처럼 쫓고 있었다.**

이번 리팩토링은 그 방향을 뒤집는 과정이었습니다.
표면적인 코드 수준 개선에서 시작해서, 도메인 모델 재설계를 거쳐,
결국 "코드를 왜 이렇게 나누는가"라는 질문까지 도달했습니다.

하나씩 고치다 보니, 결국 **코드를 바라보는 관점 자체가 많이 바뀌었습니다.**

리팩토링은 크게 세 층위로 진행했습니다.

1. [코드 수준: 불필요한 복잡성 걷어내기](#1-코드-수준-불필요한-복잡성-걷어내기) — MoveStrategy 단순화 + 테스트 전략 전환
2. [설계 수준: 멘탈 모델과 코드의 일치](#2-설계-수준-멘탈-모델과-코드의-일치) — 값 객체(CarName, TotalRound), 일급 컬렉션(Cars) 도입
3. [아키텍처 수준: 변경의 이유가 다른 것을 분리하기](#3-아키텍처-수준-변경의-이유가-다른-것을-분리하기) — domain/view 분리, 검증 책임 배치, Error 계층 구조화

---

## 1. 코드 수준: 불필요한 복잡성 걷어내기

### 1-1. MoveStrategy: 추상 클래스 → 함수

#### [Before] 추상 클래스 기반 전략 패턴

과거의 저는 "이동 전략은 변경 가능성이 높으니 전략 패턴으로 설계해야지!"라고 생각했습니다.
이 판단 자체는 틀리지 않았다고 생각합니다.
다만 구현의 방법에서 문제가 있었습니다.

```javascript
// step2: 추상 클래스 MoveStrategy
class MoveStrategy {
    isMovable() { throw new Error('구현 필요'); }
    generateNumber() { throw new Error('구현 필요'); }
}

// 프로덕션용
class RandomMoveStrategy extends MoveStrategy { ... }
// 테스트용
class FixedNumberStrategy extends MoveStrategy { ... }
class AlwaysMoveStrategy extends MoveStrategy { ... }
class NeverMoveStrategy extends MoveStrategy { ... }
```

```javascript
// step3: 구체 클래스로 변경했지만 여전히 클래스 기반
class Car {
    tryMove(moveStrategy) {
        if (moveStrategy.isMovable()) {
            this.#move(moveStrategy.step);
        }
    }
}
```

- 문제가 보이기 시작한 건 **테스트를 작성할 때**였습니다.
- AlwaysMoveStrategy, NeverMoveStrategy, FixedNumberStrategy...
- 테스트를 위해 전략 클래스를 계속 만들어야 했고, 테스트 코드가 프로덕션 코드보다 더 복잡해지는 상황이 벌어지고 말았습니다...

#### 검토한 대안

| 기준          | 추상 클래스 유지          | 구체 클래스 단순화         | **함수**                   |
| ------------- | ------------------------- | -------------------------- | -------------------------- |
| 테스트 용이성 | ✗ 전략 클래스를 매번 생성 | △ 여전히 인스턴스 필요     | **✓ `() => true` 한 줄**   |
| 가독성        | ✗ 계층 구조 파악 필요     | △ 단순하지만 여전히 클래스 | **✓ 의도가 즉시 드러남**   |
| 확장 가능성   | ✓ 전략 추가 용이          | ✓ 전략 추가 용이           | **△ 상태가 필요하면 한계** |

#### [After] 함수 기반 전략

```javascript
// moveStrategies.js
const MOVE_THRESHOLD = 4;
export const randomMoveStrategy = () =>
    generateRandomNumber() >= MOVE_THRESHOLD;
```

```javascript
// Car.js
tryMove(moveStrategy) {
    if (moveStrategy()) {
        this.#move();
    }
}
```

```javascript
// 테스트에서는 이렇게 간단해집니다
const alwaysMove = () => true;
const neverMove = () => false;

playGame(carNames, totalRound, alwaysMove);
```

- 테스트가 어렵다는 건, 지금 코드가 잘못되어 있다는 시그널일지도 모른다는 생각이 들었습니다.
- Robert C. Martin은 *"테스트하기 어려운 코드는 설계가 잘못된 코드다"*라고 했는데, MoveStrategy가 딱 그 경우였습니다.
- 이동 전략은 "특정 조건에서 전진 여부를 반환"하는 단순한 **로직 문제**이지,
  인스턴스별 상태를 관리해야 하는 **구조 문제**가 아니었습니다.

> 설계 원칙: **구조에 대한 문제는 클래스로, 로직에 대한 문제는 함수로.**

이 깨달음은 자연스럽게 다음 질문으로 이어졌습니다 — "그러면 지금 테스트 자체는 제대로 된 걸까?"

---

### 1-2. 테스트 전략 전환: 커버리지 → 행위 검증

#### [Before] 커버리지 100%에 집착한 테스트

- 발생 불가능한 입력 케이스까지 테스트 (예: Car 생성자에 number 타입 전달 — Controller가 항상 string으로 변환하므로 불가능)
- 내부 구현에 대한 테스트 존재 (private 메서드의 동작 검증)
- beforeEach 남발로 테스트 간 사이드 이펙트 발생

#### [After] 목적에 맞는 테스트

테스트 코드를 작성하는 핵심 목적은 딱 두 가지라고 생각합니다.

1. 발생 가능한 모든 Input → 올바른 Output이 나오는지?
2. 기능 추가/변경 시 다른 기능에 side effect가 없는지?

- 이 기준으로 테스트를 재설계했습니다.

| 테스트 종류                | 대상                              | 목적                                                      |
| -------------------------- | --------------------------------- | --------------------------------------------------------- |
| **도메인 단위 테스트**     | CarName, TotalRound, Car, Cars    | 비즈니스 규칙이 올바르게 동작하는지                       |
| **Controller 통합 테스트** | 입력 파싱 → 게임 실행 → 결과 반환 | 객체 간 협력이 올바른지, 새 기능 추가 시 side effect 감지 |

```javascript
// Controller.test.js — 통합 테스트
describe('게임 실행 통합 테스트', () => {
    it('항상 전진하는 전략으로 3라운드 실행', () => {
        const { roundSnapshots, winnerCarNames } = playGame(
            ['erica', 'ryang'],
            3,
            alwaysMove,
        );

        expect(roundSnapshots).toHaveLength(3);
        expect(roundSnapshots[2]).toEqual([
            { name: 'erica', position: 3 },
            { name: 'ryang', position: 3 },
        ]);
        expect(winnerCarNames).toEqual(['erica', 'ryang']);
    });
});
```

**의도적으로 제외한 것들:**

- **UI 테스트**: View는 변경이 잦은 영역이므로 테스트 유지보수 비용이 테스트로 얻는 이점보다 크다고 판단했습니다.
- **불가능한 입력 테스트**: Controller가 파싱을 담당하므로, 도메인 객체에 잘못된 타입이 들어오는 경로 자체가 존재하지 않습니다.
- **구현 세부사항 테스트**: `#move()`가 호출되었는지가 아니라, `position`이 기대값과 같은지를 검증합니다.

무엇을 테스트하느냐보다 **무엇을 테스트하지 않기로 결정했는가**가 오히려 더 중요한 판단이라는 생각이 들었습니다.

---

## 2. 설계 수준: 멘탈 모델과 코드의 일치

- MoveStrategy를 고치면서 "이 코드를 처음 보는 사람이 바로 이해할 수 있을까?"라는 질문이 떠올랐습니다. 답은 "아니오"였습니다.
- 머릿속에서는 "자동차 이름", "총 라운드 수", "자동차들"이 각각 명확한 개념인데,
  제 프로젝트 코드에서는 `string`, `number`, `Car[]`로 구현되어 있었습니다.
- 멘탈 모델을 도메인 코드에 반영한다면 보다 직관적인 이해가 가능하지 않을까하는 생각이 들었습니다.

### 2-1. 값 객체 도입: CarName, TotalRound

#### [Before] 원시값 + Car 내부 검증

```javascript
// Car 안에서 이름 검증까지 담당
class Car {
    constructor(name) {
        if (name.length > 5) throw new Error('...');
        this.#name = name;
    }
}
```

- Car가 "이름 검증"과 "이동 행위"라는 서로 다른 책임을 동시에 가짐
- `string`만으로는 "이미 검증된 5자 이하의 이름"이라는 의미를 전달할 수 없음

#### [After] CarName 값 객체

```javascript
// CarName.js — 생성 시 검증, 불변, 의미 있는 타입
export default class CarName {
    #value;
    static #MAX_LENGTH = 5;

    static of(value) {
        return new CarName(value);
    }

    static #validate(value) {
        if (!isString(value)) throw new ValueNotStringError();
        if (isEmptyString(value)) throw new ValueEmptyStringError();
        if (CarName.#isOverMaxLength(value))
            throw new ValueLengthTooLongError(CarName.#MAX_LENGTH);
    }

    constructor(value) {
        CarName.#validate(value);
        this.#value = value.trim();
    }

    get value() {
        return this.#value;
    }
}
```

```javascript
// Car.js — 이름 검증은 CarName에 위임, Car는 이동에만 집중
export default class Car {
    #name;
    #position;

    constructor(name, position = Car.#INITIAL_POSITION) {
        this.#name = CarName.of(name); // 검증은 CarName이 책임
        this.#position = position;
    }

    tryMove(moveStrategy) {
        if (moveStrategy()) this.#move();
    }
}
```

- **TotalRound**도 같은 원리입니다. `number`가 아니라 "1~10 사이의 정수"라는 도메인 개념을 타입으로 표현합니다.

```javascript
// TotalRound.js
export default class TotalRound {
    #value;
    static #MIN = 1;
    static #MAX = 10;

    static #validate(value) {
        if (!isNumber(value) || Number.isNaN(value))
            throw new TotalRoundNotNumberError();
        if (!Number.isInteger(value)) throw new TotalRoundNotIntegerError();
        if (TotalRound.#isOutOfRange(value))
            throw new TotalRoundOutOfRangeError(
                TotalRound.#MIN,
                TotalRound.#MAX,
            );
    }
    // ...
}
```

값 객체를 도입하면서 얻은 것:

- **Car의 책임이 명확해졌습니다** — 이름 검증은 CarName, 이동 행위만 Car
- **코드가 도메인 언어를 말합니다** — `string`이 아니라 `CarName`, `number`가 아니라 `TotalRound`
- **검증 로직이 한 곳에 응집됩니다** — CarName을 생성하는 순간 이미 유효한 이름임이 보장

---

### 2-2. 일급 컬렉션 도입: Cars

#### [Before] 배열 + 외부 로직

```javascript
// Controller가 Car 배열을 직접 관리
const cars = carNames.map((name) => Car.of(name));

// 중복 검증도 외부에서
if (new Set(carNames).size !== carNames.length) throw new Error('...');

// 이동도 외부에서 루프
cars.forEach((car) => car.tryMove(moveStrategy));

// 우승자 조회도 외부에서
const maxPosition = Math.max(...cars.map((c) => c.position));
const winners = cars.filter((c) => c.position === maxPosition);
```

- 과거 제 코드에서는 Car **배열** 수준의 비즈니스 로직(중복 검증, 일괄 이동, 우승자 조회)이 Controller에 흩어져 있었습니다.
- 관련된 규칙을 응집시키면서도 Cars 배열에 직접 접근을 차단하기 위한 구현 방법으로 일급 컬렉션을 택했습니다.
- 그 결과 Controller는 더 얇아지고 Cars 모듈에 비즈니스 로직을 응집시킬 수 있었습니다.

#### [After] Cars 일급 컬렉션

```javascript
// Cars.js — 컬렉션 수준의 비즈니스 로직을 소유
export default class Cars {
    #cars;

    static of(names) {
        const cars = names.map((name) => Car.of(name));
        return new Cars(cars);
    }

    constructor(cars) {
        const names = cars.map((car) => car.name);
        Cars.#validate(names); // 중복 검증은 컬렉션의 책임
        this.#cars = cars;
    }

    moveAll(moveStrategy) {
        this.#cars.forEach((car) => car.tryMove(moveStrategy));
    }

    getWinnerNames() {
        const maxPosition = Math.max(...this.#cars.map((car) => car.position));
        return this.#cars
            .filter((car) => car.position === maxPosition)
            .map((car) => car.name);
    }

    get snapshot() {
        return this.#cars.map((car) => ({
            name: car.name,
            position: car.position,
        }));
    }
}
```

이렇게 일급 컬렉션을 도입하면, Controller는 더욱 간결해집니다.

```javascript
// Controller.js
const playGame = (carNames, totalRound) => {
    const totalRoundValue = TotalRound.of(totalRound);
    const cars = Cars.of(carNames);

    const roundSnapshots = [];
    for (let i = 0; i < totalRoundValue.value; i++) {
        cars.moveAll(randomMoveStrategy);
        roundSnapshots.push(cars.snapshot);
    }

    return { roundSnapshots, winnerCarNames: cars.getWinnerNames() };
};
```

현재 도메인 모델 구조:

```
CarName  ← 값 객체 (이름 검증)
Car      ← 엔티티 (이름 + 위치 + 이동 행위)
Cars     ← 일급 컬렉션 (중복 검증 + 일괄 이동 + 우승자 조회)
TotalRound ← 값 객체 (라운드 수 검증)
```

- 코드를 처음 보는 사람도 이 4개 클래스만 보면 "아, 자동차 이름이 있고, 자동차가 있고, 자동차들을 모아서 경주하고, 라운드 수만큼 반복하는구나"를 바로 이해할 수 있을 것입니다.
- 사람이 문제를 인식하는 구조와 코드의 구조가 일치하니, 별도의 설명 없이도 코드만으로도 충분히 의도를 전달할 수 있었습니다.
- 도메인 모델링에서 멘탈 모델의 반영을 강조하는 이유도 결국 — **"코드를 읽는 비용을 최소화하는 것"**이 설계의 가장 근본적인 목적이기 때문이라는 생각이 들었습니다.

---

## 3. 아키텍처 수준: 변경의 이유가 다른 것을 분리하기

도메인 모델을 정리하고 나니, 한 가지 질문이 남았습니다.

"그럼 지금 이 코드는 왜 이렇게 나뉘어 있지?"

MVC 패턴을 적용하면서

- "Model은 View에 의존하면 안 된다",
- "Controller는 Model과 View를 중재한다"
- "입력 검증은 Model에서" 같은 규칙들을 따랐습니다.
  그리고 이 규칙들을 잘 지키는 것 자체가 좋은 설계라고 생각했습니다.

컴퓨터과학에서 유명한 코코넛 이야기가 있습니다.
원주민들이 활주로 옆에서 코코넛 헤드폰을 쓰고 비행기를 부르는 의식을 합니다.
"비행기가 올 때 항상 엔지니어들이 이렇게 했으니까..." 헤드셋을 쓰고 의식을 하면 비행기가 와서 먹을 것을 준다고 생각했던 것입니다.

비행기를 부르기 위한 형식은 따르는데 실상 중요한 가치를 모르는 셈이죠.
돌이켜보니 저도 비슷했습니다.
"Model은 View에 의존하면 안 돼"
왜? "MVC 규칙이니까." 라고 생각하고 있던 것입니다.

> **분리의 본질은 "변경의 이유가 다른 코드를 나누는 것"이었습니다.**
> 가독성 좋고 side effect 적은 클린 코드를 작성하기 위해 분리하는 것이지, MVC라는 형식을 지키기 위해 분리하는 게 아닙니다.
> SRP, OCP, DIP 같은 소프트웨어 원칙이 상위 철학이고, MVC는 그 철학을 적용한 결과물 중 하나일 뿐입니다.
> 중요한 건 **왜 분리하느냐**이지, **어떤 패턴으로 분리하느냐**가 아닙니다.

저는 결론(MVC, 클래스, 전략 패턴)에 매몰되어 목적(변경 용이성, 가독성)을 잊고 있었습니다. 정리하면 이런 계층 구조입니다.

```text
┌─────────────────────────────────────────────────┐
│           목적: 클린 코드                              │
│   "가독성 좋고, 변경에 강하고, 이해하기 쉬운 코드" │
├─────────────────────────────────────────────────┤
│           원칙 (WHY)                             │
│     SRP · OCP · DIP · LSP · ISP                 │
├─────────────────────────────────────────────────┤
│           패턴 (HOW)                             │
│     MVC · MVVM · Flux · Layered · ...           │
├─────────────────────────────────────────────────┤
│           구현 (WHAT)                            │
│     Class · Function · Module · ...             │
└─────────────────────────────────────────────────┘
```

- 상위 원칙을 이해하고 나면, 그 목적을 달성하기 위해 때로는 클래스 대신 함수를, MVC 대신 다른 구조를 유연하게 선택할 수 있게 됩니다.

- 이번 리팩토링에서 MoveStrategy를 클래스에서 함수로 바꾼 것도, 검증 책임을 MVC 규칙이 아니라 변경 축 기준으로 재배치한 것도, 결국 이 계층별 우선순위를 반영한 결과입니다.

이 깨달음을 기준으로 프로젝트 내에서 세 가지 방향으로 리팩토링을 진행했습니다.

---

### 3-1. domain / view 파일 구조 분리

```
src/
├── domain/           # 변경 빈도: 낮음 (비즈니스 규칙)
│   ├── Car/
│   ├── CarName/
│   ├── Cars/
│   ├── TotalRound/
│   └── DomainError.js
├── view/             # 변경 빈도: 높음 (UI 표현)
│   ├── ConsoleIO.js
│   ├── templates.js
│   ├── ViewError.js
│   └── index.js
├── Controller.js     # 흐름 조율
├── moveStrategies.js
├── AppError.js
└── utils.js
```

변경의 **원인**도 다르지만, 더 중요한 건 변경의 **빈도** 차이입니다.

- 도메인 규칙(이름 5자 제한, 라운드 1~10)은 거의 바뀌지 않습니다.
- UI 표현(프롬프트 문구, 결과 포맷)은 자주 바뀝니다.

이 둘을 다른 폴더에 두면, UI를 수정할 때마다 도메인 코드를 건드리게 될 리스크가 줄어듭니다.

---

### 3-2. 검증 책임 3단 배치

"이 검증이 실패했을 때, **누가 알아야 하는가?**"

이 질문 하나로 검증 책임을 자연스럽게 분리할 수 있었습니다.

| 레이어         | 검증 내용                         | 판단 근거                                        |
| -------------- | --------------------------------- | ------------------------------------------------ |
| **View**       | 빈 입력 체크                      | 콘솔 환경에 의존적인 UI 문제. 도메인은 몰라도 됨 |
| **Controller** | 파싱/변환 (`"1,2,3"` → `[1,2,3]`) | 입력 형식의 변환. 도메인 규칙이 아님             |
| **Domain**     | 5자 제한, 중복 체크, 범위 제한    | 비즈니스 규칙. UI가 바뀌어도 변하지 않음         |

```javascript
// View — 빈 입력만 체크
const validateNotEmpty = (input, fieldName) => {
    if (input.trim() === '') throw new EmptyInputError(fieldName);
};

// Controller — 파싱/변환
const convertStringToArray = (input) =>
    parseAndTrim(input, CAR_NAMES_INPUT_SEPARATOR);

// Domain — 비즈니스 규칙
// CarName: 5자 제한
// Cars: 중복 체크
// TotalRound: 1~10 범위
```

---

### 3-3. Error 계층 구조화 + View 재구성

#### Error 계층

#### [Before] 에러 출처 구분 불가

```
RuntimeError
└── ValidationError ← Model과 View가 동일한 에러 사용
```

- 에러가 발생했을 때 "이게 도메인 규칙 위반인지, UI 입력 문제인지" 구분할 수 없었습니다.

#### [After] 레이어별 에러 계층

```
AppError (type 프로퍼티로 공통 처리 인터페이스 제공)
├── DomainError (type = 'DOMAIN')
│   ├── CarNameError
│   │   ├── ValueNotStringError
│   │   ├── ValueEmptyStringError
│   │   └── ValueLengthTooLongError
│   ├── CarsError
│   │   └── CarNamesDuplicatedError
│   └── TotalRoundError
│       ├── TotalRoundNotNumberError
│       ├── TotalRoundNotIntegerError
│       └── TotalRoundOutOfRangeError
└── ViewError (type = 'VIEW')
    └── EmptyInputError
```

```javascript
// Controller에서 에러 타입으로 분기 처리
catch (error) {
    if (error instanceof AppError) {
        View.printErrorMessage(error.type, error.message);
    } else throw error;
}
```

- 에러 메시지 하나만 보고도 **어느 레이어에서, 어떤 규칙을 위반했는지** 바로 파악할 수 있습니다.

```
[DOMAIN] [CarNameError] carName은 5자를 초과하여 설정할 수 없습니다.
[VIEW] 자동차 이름은(는) 빈 값일 수 없습니다.
```

---

#### View 재구성

#### [Before] Reader / Writer

- 입출력 수단(콘솔)과 출력 형식(포맷)이 한 곳에 섞여 있었습니다.

#### [After] 역할별 분리

| 모듈           | 역할                                        | 변경 이유             |
| -------------- | ------------------------------------------- | --------------------- |
| `ConsoleIO.js` | **어떻게** 입출력하는가 (readline 래핑)     | 입출력 환경이 바뀔 때 |
| `templates.js` | **무엇을** 보여주는가 (프롬프트, 포맷 함수) | 출력 형식이 바뀔 때   |
| `index.js`     | **어떤 순서로** 화면을 구성하는가           | 화면 흐름이 바뀔 때   |

```javascript
// templates.js — "무엇을" 보여줄지
export const formatRound = (cars) =>
    cars
        .map(({ name, position }) => `${name} : ${'-'.repeat(position)}`)
        .join('\n');

export const formatWinner = (winnerCarNames) =>
    `${winnerCarNames.join(', ')}가 최종 우승했습니다.`;

// ConsoleIO.js — "어떻게" 입출력할지
export const readLine = (prompt) =>
    new Promise((resolve) => {
        readlineInterface.question(prompt, resolve);
    });

export const printLine = (text = '') => console.log(text);
```

- 콘솔이 아닌 웹 UI로 바꿔야 한다면 `ConsoleIO.js`만 교체하면 됩니다.
- 출력 문구를 바꿔야 한다면 `templates.js`만 수정하면 됩니다.
- **변경의 이유가 다른 코드가 다른 파일로 분리**해 둔 덕분입니다.

---

## 📝 기타 개선 사항

- ESLint flat config 마이그레이션으로 린트 설정 최신화
- Husky + lint-staged 도입으로 커밋 시 자동 린트 검사
- [코딩 컨벤션](../CONVENTION.md) 기준 하에 전체 코드 일관성 정리
- 상수는 사용 지점에 최대한 가까이 배치 (static private field 활용)

---

## 🤔 고민했던 지점

### 1. 값 객체의 동등성 비교

- 현재 `CarName`은 값 객체이지만 `equals()` 메서드가 없습니다.
- Cars에서 중복 검증 시 `car.name` (string)으로 비교하고 있습니다.

```javascript
// 현재: 내부 값을 꺼내서 비교
const names = cars.map((car) => car.name);
static #isDuplicated(names) {
    return new Set(names).size !== names.length;
}
```

- 값 객체라면 동등성 비교를 객체 스스로 책임져야 하지 않을까요?
- 하지만 JS에는 `==` 연산자 오버로딩이 없어서 `equals()`를 직접 구현해야 하고, 현재 사용처가 중복 검증 한 곳뿐입니다.

- **"지금 필요하지 않으면 만들지 않는다(YAGNI)"와 "값 객체의 본질적 책임"** 사이에서, 현재는 YAGNI 쪽에 무게를 두었는데, 이 판단이 합리적인지 피드백 부탁드립니다.

---

### 2. 일급 컬렉션의 불변성

- `Cars.moveAll()`은 내부 `Car`들의 `position`을 직접 변경합니다.

```javascript
moveAll(moveStrategy) {
    this.#cars.forEach((car) => car.tryMove(moveStrategy));
}
```

- 일급 컬렉션이라면 불변이어야 한다는 원칙이 있습니다.
- 그렇다면 `moveAll`이 기존 `Cars`를 변경하는 대신, 새로운 `Cars`를 반환하는 방식이 맞을까요?

```javascript
// 불변 방식이라면 이런 모양이 될 텐데...
moveAll(moveStrategy) {
    const movedCars = this.#cars.map(car => car.tryMoveAndReturn(moveStrategy));
    return Cars.from(movedCars);
}
```

- 현재 구조에서는 `Car.tryMove`가 void를 반환하므로, 불변으로 전환하려면 `Car`까지 변경해야 합니다.
- 이 트레이드오프가 현재 규모에서 합당한지, 아니면 현재 수준의 가변성이 더 실용적인지 궁금합니다.

---

### 3. YAGNI

- 이번 리팩토링의 핵심 판단 중 하나가 MoveStrategy를 함수로 변환한 것입니다.
- 현재 함수 시그니처는 `() => boolean`으로, 이동 여부만 반환합니다.

- 만약 "이동 거리도 전략에 포함해야 한다"는 요구사항이 추가된다면?
- `() => boolean`은 `() => { shouldMove: boolean, step: number }`로 바뀌어야 할 것이고, 이건 결국 다시 객체를 반환하는 형태가 됩니다.

- **"지금 필요하지 않은 확장"과 "합리적 수준의 유연성"** 사이의 경계를 어떻게 판단하시는지 궁금합니다.
- 현재 `() => boolean`이 향후 확장을 과도하게 제한하는 건 아닌지, 아니면 그때 가서 바꾸면 되는 수준인지
- 멘토님의 판단 기준이 궁금합니다.

---

## 👩‍💻 향후 계획

- 이번 리팩토링 과정에서 배운 점(수단 vs 목적, 테스트 시그널, 멘탈 모델) 별도로 정리
- 설계 다이어그램 README에 추가

---
