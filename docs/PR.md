## 📄 3분 요약

안녕하세요. 멘토님, 늦어서 죄송합니다.
가감없는 피드백 부탁드립니다. 많이 배워가겠습니다 🥊

-   이번 자동차미션은 `역할과 책임에 따라 코드를 잘 분리하자`를 핵심 목표로 진행했습니다. 역할과 책임 단위로 코드를 분리하지 않아 작성하다보니, 가독성도 낮고 유지보수나 디버깅도 어려웠기 때문입니다.

-   역할과 책임에 따라 코드를 분리하기 위해, 아래 흐름으로 미션을 설계-진행하였습니다.
    (1) [역할과 책임에 따라 MVC 세 영역으로 코드 분리하기]()
    (2) [객체 간 협력 관계 설계]()
    (3) [적절한 형태의 구현 방식 선택]()

-   또한 특정 디자인 패턴 적용 전, As-Is vs To-Be 비교해 trade-off 따져 보아 꼭 필요한 경우만 패턴을 적용했습니다.

-   미션을 진행하며, 의문이 들었던 부분을 `고민했던 지점 및 연관 질문 부분`에 정리해 두었으니 점검 부탁드립니다.

## 💭 도메인 영역과 UI 영역 분리 위해 MVC 패턴 도입 결정

### **_[Before] MVC 도입 전_**

-   하나의 클래스 안에 UI 영역과 도메인 영역의 코드가 혼재되어 아래 문제들이 발생했습니다.

    1. 클래스 간의 `높은 코드 결합도`로 변경과 확장에 취약
    2. `낮은 가독성`으로 코드 이해가 어려워 유지 보수 어려움
    3. `낮은 코드 재사용성`

### **_[After] MVC 도입_**

-   도입 목적: `책임 소재를 명확히 하여 변경과 확장 유지보수에 좋은 구조 설계`

    -   app 내 코드를 `목적`에 따라 UI 영역(View)과 도메인 영역(Model)으로 분리
    -   프로그램 흐름에 따라 View, Model에 명령 내리는 역할 Controller로 분리

-   MVC 도입하며, 코드 작성 시 신경 쓴 부분

    ✅ Model, View, Controller 각각의 `목적`에 따라 클래스에 코드를 분할하였습니다.

    -   Model : 상태값을 가지고 이를 변경하거나 반환하는 코드
    -   View : 사용자 인터페이스를 통해 입출력을 수행하는 코드
    -   Controller : (1) 프로그램 흐름에 따라 Model에게는 데이터 처리 명령을 (2) View에게는 입출력 명령을 내리는 코드

    ✅ Model, View, Controller 사이의 의존성을 신경쓰며 상태를 관리했습니다.

    -   Model은 Controller와 View에 의존하지 않음
    -   View는 Model에만 의존하고, Controller에 의존해서는 안됨
    -   Controller는 Model과 View에 의존해도 됨

-   도입 결과
    -   `목적`에 따라 Model, View, Controller 역할을 수행하는 별도의 객체로 분리
        -   가독성 향상되어 다른 개발자 뿐 아니라 내가 코드를 이해하는 속도 빨라짐
        -   각 클래스 간의 코드 결합도가 낮아져 변경과 확장이 쉬운 코드로 변화

## 🚗 변경 가능 부분 분리 위해 전략 패턴 적용

-   **_[Before] 분리 전_**

-   기존 코드는 playRound 함수에 랜덤 함수 생성 로직이 포함되어 함수 결과 예측이 어려워, 테스트 코드로도 검증하기가 어려웠습니다 .
-   전진조건은 요구사항 변경 가능성이 높고, 확장 가능성도 높지만 하단 코드는 변경에 취약합니다.

    ```javascript
    // utils/utils.js
    const getRandomNumber(min = 0, max = 6) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // src/Models/Game.js
    class Game {
        #cars = [];
        #playRoundCalls = 0;
        #saveRoundHistory = [];

        #playRound() {
            this.#cars.forEach((car) => {
            car.tryMoveWith(getRandomNumber());
            });

            this.#playRoundCalls += 1;

            this.#saveRoundHistory();
        }
    }
    ```

-   **_[After] 전략 패턴 도입_**
-   해당 미션에서 자동차 전진 조건은 변경되거나 확장되기 쉬운 부분이라 생각했습니다.

    -   기존: 입력값이 4 이상이면 위치를 1칸 전진하고, 미만이라면 유지
    -   `조건 변경` 가능: 입력값이 x 이상, y칸 전진/후진/유지/ 입력값 특정 범위/...
    -   조건 `변경 지점`: 사용자 입력/ 컨트롤러 내부/ …
    -   조건 `변경 시점`: 라운드 별/자동차 별/ …

-   도입 목적: `(1) 확장 용이하고 (2) 결과를 예측할 수 있는 코드 작성`

    -   `MoveStrategy` 추상클래스 구현해 전진 조건 관리 일임

        -   여러 전진 조건이 추가되더라도 `MoveStartegy` 구현한 전략 객체 추가함으로서 확장 용이
        -   전진 조건을 외부에서 변경할 수 있는 `setMovableCondition` 인터페이스에 의해 어느 시점에서든 외부에서 전진 조건 변경 가능

    -   테스트 시, 고정 숫자를 반환하는 `FixedStrategy`를 사용해 의도한대로 코드가 동작하는지 확인 가능

## 🤔 고민했던 지점 및 연관 질문

### ❓ 테스트 레이어와 프로덕션 레이어

-   private 친구들을 테스트하기 위해 테스트를 위한 별도의 메소드를 프로덕션 코드에 만드는 건 지양하라고 배웠습니다.
-   하지만 private 친구들이 중요한 로직을 담당한다면 테스트 대상이 되어야 한다고 생각합니다.
-   private 메소드가 중요한 로직을 담당해서 테스트해야하는 경우, public으로 작성하거나 별도의 모듈로 분리해야하는건가요?
-   테스트에서만 사용하는 전략 패턴은 `project/test/*` 하위에 두었는데 이 구조가 올바른가요?

### ❓ 에러 발생과 처리 지점의 적합성

#### 에러 발생의 책임

-   현재 코드에서는 입력값에 대한 유효성 검증 지점을 `Model` 내 `Constructor` 내부로 통일해두었습니다.
-   도메인 로직에서 유효성이 확인해야하는 경우라고 판단했기 때문입니다.
    1. Console로 전달되는 `userInput` 관련 유효성 검사 → `Game` Model `Constructor`에서 처리
    2. 자동차 `name` 관련 유효성 검사 → `Car` Model `Constructor` 에서 처리
-   Model 말고 View에도 값 검증에 대한 책임을 추가하여 이중으로 검증하면 좋다고 생각합니다. `userInput`이 비어있을 때의 유효성 검증 지점이 `View`에도 추가하는게 좋을까요?
    -   비어 있는 경우 외의 `값의 유효성 검사`(자동차 이름 타입값, 이름 길이 초과, 중복 이름 등)에 대한 모든 검증이 Model과 동일하게 View에 위치하는 것이 좋을까요?
    -   일부 검증에 대해서만 View가 책임을 가진다면 그 기준은 무엇인가요?
-   Controller에는 값 검증의 책임을 두지 않는 편이 좋은지 궁금합니다.

#### 에러 처리 지점의 적절성 여부

-   현재 코드에서는 실제 사용자로부터 `입력 이벤트가 발생한 시점`에 이벤트 핸들러가 호출되어, `게임 설정 - 진행 - 결과 출력` 순서로 동작합니다.
-   따라서 이벤트 핸들러 내에 try-catch 문을 작성해 에러 발생여부를 잡아내 `View` 에게 에러 메시지 출력을 명령했습니다.
-   최대한 상단에 에러 처리하는 로직을 위치시켰습니다. `처리하는 지점`과 `처리 방식`이 적절한지 한 번 확인해 주셨으면 합니다.

```jsx
// src/GameController.js

export default function createGameController() {
    const view = createView();

    function initiateGame() {
        view.addEventHandlerToInputReader(gameEventHandler);
    }

    function gameEventHandler(carNames, RoundCount) {
        const { set, play, getResult } = createGame();
        try {
            set(carNames, RoundCount);
            play();
            view.printGameResult(getResult());
            view.closeInputReader();
        } catch (error) {
            view.printErrorMessage(error.getMessage());
            initiateGame();
        }
    }

    return {
        initiateGame,
    };
}
```

## 🤔 그 외 피드백 희망 부분

-   하단 요소를 중점적으로 코드 리뷰 부탁드립니다.

    ✅ 에러 발생의 책임과 에러 처리의 책임이 적절히 분리되고, 각각 잘 처리되고 있는지

    ✅ 객체 간 협력 체계가 잘 설계되었는지

    ✅ 하나의 객체에서 지나치게 많은 일을 하고 있지 않은지

    ✅ 함수의 단일 책임 원칙이 잘 구현되었는지

    ✅ 패턴이나 특정 구현 방식이 굳이 필요하지 않은데 오버엔지니어링 된 부분이 없는지

-   이 외에도 가독성, 재사용성, 성능 측면에서 리팩토링이 필요한 부분이 있다면 편하게 피드백 부탁드립니다.
