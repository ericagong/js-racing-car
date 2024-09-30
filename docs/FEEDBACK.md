## 📄 3분 요약

안녕하세요. 멘토님, 만나뵙게되어 반갑습니다. 가감없는 피드백 부탁드립니다. 많이 배워가겠습니다 🥊

-   이번 자동차미션 [step 1]은 세 가지 목표를 가지고 진행했습니다.
    (1) [나만의 TDD 사이클](https://github.com/ericagong/js-racingcar#-%EC%A7%81%EC%A0%91-%EC%A0%95%EC%9D%98%ED%95%9C-%EB%82%98%EB%A7%8C%EC%9D%98-tdd-cycle) 정의
    (2) `가장 작은 버전의 핵심 기능부터 우선적으로 구현`→ `복잡성을 추가하며 기능을 확장`
    (3) 리팩토링 시 `가독성` , `재사용성` , `성능` 을 고려
-   `고민했던 지점 및 연관 질문 부분`만 읽고 피드백 주셔도 충분할 것 같습니다.
    **[질문 리스트]**
    ✅ 콜백함수와 View의 Controller 의존 여부
    ✅ 값의 유효성을 검사하고, 에러를 발생시키는 지점이 적절한가
    ✅ 에러 처리 지점 및 처리 방식이 적절한가
    ✅ 클래스가 필요하다고 결정하는 기준은 무엇인가
    ✅ 실무에서 테스트 입력값을 환경 변수 가져와서 생성하게 처리하는지
    ✅ 무작위 생성값을 모두 검증해야하는지, 아니면 유효한 값, 경계값, 유효하지 않은 값 등 일부만 검증해도 되는지

## 🔧 MVC 아키텍쳐 도입 결정

-   **_[Before] MVC 도입 전_**
    -   클래스 안에 목적이 다른 여러 코드가 혼재해서 아래 문제점들이 발생 가능하다고 판단했습니다.
        1. 클래스 간의 `높은 코드 결합도`
        2. `낮은 가독성`으로 구현자들 간의 커뮤니케이션 효율성 저해
        3. `낮은 코드 재사용성`
-   **_[After] MVC 도입_**
    -   도입 목적: `복잡한 app 내 코드를 **목적**에 따라 세 부분으로 분리하는 MVC 아키텍쳐 적용`
    -   MVC 도입하며, 코드에서 신경 쓴 부분
        ✅ Model, View, Controller 각각의 `목적`에 따라 클래스에 코드를 분할하였습니다.
        -   Model : 상태값을 가지고 이를 변경하거나 반환하는 코드
        -   View : 사용자 인터페이스를 통해 입출력을 수행하는 코드
        -   Controller : (1) 프로그램 흐름에 따라 Model에게는 데이터 처리 명령을 (2) View에게는 입출력 명령을 내리는 코드
            ✅ Model, View, Controller 사이의 의존성을 신경쓰며 상태를 관리했습니다.
        -   Model은 Controller와 View에 의존하지 않음
        -   View는 Model에만 의존하고, Controller에 의존해서는 안됨.
        -   Controller는 Model과 View에 의존해도 됨.
    -   도입 결과
        -   `목적`에 따라 Model, View, Controller 역할을 수행하는 별도의 클래스로 분리
            -   가독성 향상되어 구현자들 간의 커뮤니케이션 효율성 향상 기대
            -   각 클래스 간의 코드 결합도가 낮아져 향후 요구사항 변경 시 유지보수 용이할 것으로 기대됨

## 🤔 고민했던 지점 및 연관 질문

### ❓View의 Controller 의존 여부

-   View는 Model에는 의존 가능하되, Controller에는 의존해선 안된다고 알고 있습니다.
-   현재 코드에서 View 내부 handleInputWith의 콜백함수로 GameController 내부 함수가 전달됩니다.
-   이 경우, `View가 Controller에 대한 의존성이 없다고 볼 수 있나요`?
    ```jsx
    // ./src/View/View
    export default class View {
      handleInputWith(cbFunc) {
        rl.question(MESSAGES.INIT_GUIDE, (input) => {
          cbFunc(input);
          rl.close();
        });
      }
    ...
    }
    ```
    ```jsx
    // ./src/Controller/GameController

    /**
     * View에서 userInput을 받았을 때, GameFlow가 수행되도록 이벤트 핸들러를 등록한다.
     */
    addEventHandlerToView() {
      this.#view.handleInputWith((userInput) => this.#playGameWith(userInput));
    }

    ```

### ❓값의 유효성 검증 지점의 적절성 여부

-   현재 코드에서는 유효성 검증 지점을 `Model` 내 `Constructor` 내부로 통일해두었습니다.
-   도메인 로직에서 유효성이 확인해야하는 경우라고 판단했기 때문입니다.
    1. Console로 전달되는 `userInput` 관련 유효성 검사 → `Game` Model `Constructor`에서 처리
    2. 자동차 `name` 관련 유효성 검사 → `Car` Model `Constructor` 에서 처리
-   `userInput`이 비어있을 때의 유효성 검증 지점이 `View` 로 옮겨져야하는지 고민입니다.
-   `값의 유효성 검사`는 Model, View, Controller 중 `누구의 책임`으로 보는 것이 적절한가요?

### ❓에러 처리 지점의 적절성 여부

-   현재 코드에서는 실제 사용자로부터 `입력 이벤트가 발생한 시점`에 이벤트 핸들러가 동작하며, `게임 설정 - 진행 - 결과 출력` 기능이 동작합니다.
-   따라서 이벤트 핸들러 내에 try-catch 문을 작성해 에러 발생여부를 잡아내 `View` 에게 에러 메시지 출력을 명령했습니다.

```jsx
// src/Controller/GameController

  addEventHandlerToView() {
    this.#view.handleInputWith((userInput) => this.#playGameWith(userInput));
  }

  #playGameWith(userInput) {
    try {
      this.#setGame(userInput);
      this.#startGame();
      this.#printGameResult();
    } catch (error) {
      this.#printError(error);
    }
  }

  #printError(error) {
    this.#view.logErrorMessage(error.message);
  }
```

-   에러를 `처리하는 지점`과 `처리 방식`이 적절한지 한 번 확인해 주셨으면 합니다. 피드백 부탁드립니다.

### ❓클래스의 필요성

-   현재 코드는 `MVC` 하에 각각의 클래스로 구현되어 있습니다.
    -   Model: Car, Game
    -   View: View
    -   Controller: GameController
-   step1을 진행하는 내내 `클래스로 구현해야하는 경우`와 `그렇지 않은 경우`를 따져보려했습니다.
-   GameController에서 Car, Game, View의 인스턴스를 상태값으로 가집니다.
-   각 인스턴스 별로 독자적인 데이터값을 관리한다는 점에서 Car, Game, View가 클래스 형태인 것은 목적 적합하다고 생각합니다.
-   하지만 `굳이 GameController를 Class로 구현해야할까?` 하는 생각이 듭니다. 실제로 ./src/index.js에서는 인스턴스를 선언만 할 뿐이거든요.

```jsx
// ./src/index.js

import GameController from './Controller/GameController';

new GameController();
```

-   그럼에도 불구하고 GameController를 클래스로 구현한 까닭은 `캡슐화` , `코드 구조화` , `테스트 용이성` 등의 클래스로 구현했을 시 누릴 수 있는 장점이 뚜렷했기 때문입니다.
-   혹시 코드를 작성하기 전이나, 리팩토링 할 때 `어떠한 기준에 의해` 클래스로 구현해야겠다고 판단하시는 `기준`이 있으신가요? 공유해주신다면, 향후 설계나 리팩토링 시 의사 결정에 큰 도움이 될 것 같습니다. 🙏🏻

### ❓ 환경 상수에 따른 테스트 입력값 자동 생성

```jsx
import {
    CAR_ERROR_MESSAGE,
    CAR_INIT_POSITION,
    CAR_NAME_MAX_LENGTH,
} from '../src/constants/car.js';
import { getRandomIntRangeOf } from '../src/utils/utils.js';

/**
 * 테스트 파일에서 사용하는 공통 상수
 */
const BASE_STR = 'a';
const VALID_NAME = BASE_STR.repeat(CAR_NAME_MAX_LENGTH);

it.each([
    { name: '빈 값', input: '', expected: CAR_ERROR_MESSAGE.EMPTY_NAME },
    {
        name: `${CAR_NAME_MAX_LENGTH}자 초과`,
        input: VALID_NAME + BASE_STR, // CAR_NAME_MAX_LENGTH + 1 길이의 문자열
        expected: CAR_ERROR_MESSAGE.LONG_NAME,
    },
])(`자동차 이름이 $name인 경우, 에러를 발생시킨다.`, ({ input, expected }) => {
    () => new Car(input, CAR_INIT_POSITION).toThrow(expected);
});
```

-   자동차 이름 최대 길이를 상수로 선언하고, 상수를 가져와 적절한 길이의 이름을 생성하도록 코드를 작성하였습니다.
-   이처럼 외부 환경 변수에 따라 테스트 input 값이 달라져야하는 경우, 별도의 테스트 input 생성 함수를 만들어주나요?
-   아니면 고정 값을 사용하는게 낫나요?
-   생성 함수를 만들어 주는 것이 좋지만, 생성 함수가 테스트 파일 외부 utils 폴더 하위 등으로 모듈화되면 `가독성이 너무 떨어진다`고 생각됩니다.
-   실무에서는 어떤 방법이 사용되나요?

### ❓ 테스트 입력값의 검증 범위

```jsx
   describe(`[feature2] 자동차는 ${CAR_MOVE_CRITERIA} 이상이면 전진하고, 아니면 현재 위치를 유지한다.`, () => {
     const car = new Car(VALID_NAME, CAR_INIT_POSITION);

     let testCases = [];
     for (let i = RANDOM_NUM_LOWER_LIMIT; i < RANDOM_NUM_UPPER_LIMIT; i++) {
       testCases.push({
         name: i,
         input: i,
       });
     }
     const movableTCs = testCases.slice(CAR_MOVE_CRITERIA, testCases.length);
     const immovableTCs = testCases.slice(0, CAR_MOVE_CRITERIA);

     it.each(movableTCs)(
       `자동차는 무작위 값이 ${CAR_MOVE_CRITERIA} 이상인 $name이면, 전진한다.`,
       ({ input }) => {
         const PREV_POS = car.position;
         car.tryMoveWith(input);
         expect(car.position).toBe(PREV_POS + CAR_MOVE_STEP);
       }
     );
```

-   무작위 값이 생성되는 경우, 가능한 모든 값을 input 값으로 넣고 검증해주었습니다.
-   가능한 값의 범위가 0-9가 아니라 0-100,000 로 넓어지게 된다면 모든 값을 검증해야할 수 없을 것 같아 질문드립니다.
-   유효한 값 1개 + 경계값 + 유효하지 않은 값 1개 식으로만 일부 검증하는 방식을 사용하나요? 궁금합니다.

# 🔧 변경사항

## ✅ Step1 피드백 기반 변경사항

1. 상수 처리

-   Model 내부로 상수 위치 변경
-   상수가 클래스와 결합해야하면 `static` 키워드 사용
-   클래스 내부 상태 은닉 필요하면 `private` 접근 제어자 사용

1. 요구사항 변경 가능지점 체크하여 확장성 고려해 코드 작성

-   자동차 전진 조건 = 요구사항 변경 가능 지점
    -   자동차 전진 조건 변경 지점 다양할 수 있음: 사용자 입력/ 컨트롤러 내부/ …
    -   자동차 전진 조건 변경 시점 자양할 수 있음: 라운드 별/자동차 별/ …
-   자동차 전진 조건을 수정할 수 있도록 Game Model의 static 변수로 isMovable 함수 선언하고, getter, setter를 등록하여 변경 지점과 시점에서 자유로울 수 있게 설계
-   자동차 전진 조건에 따른 테스트 코드 변경

1. 테스트 코드

-   가독성을 위해 테스트 입력값 자동 생성 코드 삭제

1. 팩토리 패턴 도입

-   클라이언트단에서 모델을 직접 생성하지 않도록 Model의 static of 메소드로 대체

## ✅ Step1 공통 피드백 기반 변경 사항

1. 가독성
    - 클래스 내 변수/메소드 구현 순서 통일: `상수 -> 클래스 변수 -> 인스턴스 변수 -> 생성자 -> 메서드`
    - 개행 방식 통일
    - import 문 순서 규칙에 따라 통일
2. 재사용성
    - JS 빌트인 객체 내장메서드 최대한 활용
    - for, while 반복문 대신 Array 객체 내장 메서드 사용
    - 명령형보다는 선언형 코드 작성
3. 테스트
    - 테스트를 위한 코드는 프로덕션 코드에서 분리
    - 단위 테스트 실패 이유가 명확하도록 단위 테스트 분리

## 🤔 향후 리팩토링 고려 지점

1. 클래스를 일반 객체나 함수 모듈로 변경

-   `Controller`나 `View` 는 인스턴스별로 독립적으로 관리해야하는 데이터가 없다고 판단되어, 클래스가 아닌 일반 객체/ 함수 형태로 모듈화하고자 합니다.
-   step2 요구사항까지 구현한뒤, 여전히 클래스 형태가 불필요하다고 생각되면 변경하려합니다.

## 📄 개괄

안녕하세요. 준일 멘토님, 늦어서 죄송합니다.
가감없는 피드백 부탁드립니다. 많이 배워가겠습니다 🥊

-   이번 자동차미션 [step 2]는 세 가지 목표를 가지고 진행했습니다.
    (1) 객체의 `역할`과 `책임` 분리하기
    (2) `테스트가 어렵거나` or `예측하기 어려운` 코드를 분리하기
    (3) `클래스` 필요성에 대해 고민하고, 불필요하다면 간략한 형태로 작성하기

## 🔧 주요 변경 사항

-   [step1 피드백](https://github.com/next-step/js-racingcar/pull/178) 반영하여 리팩토링 진행했습니다.
    ✅ 객체의 역할과 책임을 분리하기 위해 Game 모델을 `Game`과 `Cars`로 분리하였습니다.
    ✅ 랜덤 숫자를 생성하는 부분을 `MoveStrategy` 객체로 분리하였습니다.
    ✅ 클래스 형태로 작성할 필요가 없다고 판단한 경우, IIFE 형태의 모듈로 변경하였습니다.

## 🤔 변경사항 관련 질문

### ❓ 랜덤 숫자 생성 로직 외부 분리

-   기존 버전에서는 랜덤 숫자 생성 로직이 함수 내에 포함되어 있어 (1) 함수 결과 예측이 어렵고, 자연히 (2) 테스트 코드 작성이 어려웠습니다.
-   별도의 `MoveStrategy` 객체에 숫자 생성 및 전진 조건 관리를 일임했습니다.
-   전략 패턴을 사용하기 위해 인터페이스 대신 `MoveStrategy` 상속 구조를 사용했는데, 확인 부탁드립니다.
-   step1 피드백에서 말씀하셨던 전진 조건 변경 로직 및 우승자 예측 테스트 코드를 작성해두었으니 검토 부탁드립니다. 피드백에서 의도하셨던 방향이 이게 맞나요?

### ❓클래스 대신 IIFE 모듈 사용

-   클래스로 구현하는 핵심 목적은 `인스턴스별 독자적인 데이터 관리 필요성` 때문이라 생각하여, 그렇지 않은 경우 IIFE 모듈로 변경하였습니다.
-   `IIFE`에서 발생하는 클로저 현상을 통해 `private` 변수를 구현해 `캡슐화/은닉화`할 수 있었습니다.
-   혹시 잘못된 방법이나 관점이라면 알려주세요.

## 🤔 그 외 질문

1. 단위 테스트는 각 파일의 public 메소드에 대해서만 수행하면 되나요?

-   private 친구들을 테스트하기 위해 테스트를 위한 별도의 메소드를 프로덕션 코드에 만드는 건 지양하라고 배웠습니다.
-   그렇다면 private 친구들이 중요한 로직을 담당하더라도 테스트에서 제외되는건가요?
-   private 메소드가 중요한 로직을 담당해서 테스트해야하는 경우, 그럼 어떻게 처리해야하는 건가요? (테스트를 위해 public으로 바꾸는게 맞는지 계속 고민이 됩니다.)

2. 비슷한 맥락의 질문입니다. 테스트 코드에서 객체 내 상수에 접근해야 하는 경우, 테스트코드의 접근을 위해 public 접근 제어자를 사용하거나, static 처리하는게 올바른가요?
