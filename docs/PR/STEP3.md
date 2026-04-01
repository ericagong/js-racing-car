## 📄 1분 요약

안녕하세요. 멘토님, 늦어서 죄송합니다.  
가감없는 피드백 부탁드립니다. 많이 배워가겠습니다 🥊

-   [자동차 미션 step1, step2 구현 피드백](https://github.com/ericagong/js-racing-car/pull/1)을 바탕으로 step3 리팩토링을 진행했습니다.

1. 우선, [특정 기준 하에 코드 컨벤션을 설정하여, 전체 코드에 일괄적으로 적용](#코딩-컨벤션-적용)하였습니다.

2. [변경 지점들에 대해 As-Is vs To-Be 형식으로 비교하고, 변경으로 인한 효과에 대해 간략히 기술](#리팩토링-변경-사항)해 두었으니 참고 부탁드립니다.

3. 리팩토링 시, [고민했던 지점 및 연관 질문 부분](#고민했던-지점-및-연관-질문)을 정리해 두었으니 피드백 부탁드립니다.

4. step3 코드 리뷰 후, 추가로 반영할 내용들을 [향후 과제](#향후-과제)로 적어두었습니다.

---

## 📖 코딩 컨벤션 적용

코드 가독성을 높여 향후 유지보수를 용이하게 하기 위해 명확한 기준 아래 [코딩 컨벤션](../CONVENTION.md)을 세우고 전체 코드에 일괄적으로 적용했습니다.

---

## 🔧 리팩토링 방향성

코드의 복잡성을 줄이고 유지보수성과 가독성을 높이기 위해 전체 코드를 다섯 가지 주요 방향에서 리팩토링하였습니다.

### 1. 객체가 하나의 책임만 가질 수 있도록 분리

#### **As-Is: 하나의 객체가 여러 책임을 가짐**

-   단일 객체가 여러 책임을 가지면 코드가 복잡해 다음과 같은 문제점이 발생합니다.

1. 변경 파급 범위 예측 어려움: 코드 변경 시 어디까지 영향이 미치는지 파악하기 어려움
2. 유지보수와 디버깅 어려움: 책임 분리가 불명확해 문제가 발생했을 때 원인을 찾기 힘듦

#### **To-Be: 객체의 책임을 명확히 분리**

-   변경 지점:
    -   ✅ Car Model에서 자동차 이름 유효성 검사 로직을 CarName Model로 분리
    -   ✅ 자동차 이름 배열의 중복 여부 검사와 Car 배열 관리 책임을 별도 파일로 분리
    -   ✅ 각 라운드의 자동차 결과 저장 책임을 Round 객체로 분리

---

### 2. 게임 이동 조건 관리 책임을 MoveStrategy로 일임 및 주입 지점 통일

#### **Before: 불필요한 전략 패턴 도입으로 인한 복잡성 증가**

-   초기 설계에서는 자동차 전진 조건의 변경 가능성을 고려해 전략 패턴을 도입했습니다.

-   추상 클래스인 MoveStrategy에서 두 가지 추상 메소드를 강제 구현:

1. isMovable(): 이동 가능 여부 판단
2. generateNumber(): 이동 여부를 결정하는 랜덤 숫자 생성

-   문제점:

1. 이동 전략 관련 상수(CAR_MOVE_STEP)가 constants.js 등 여러 파일에 분산 관리됨
2. generateNumber()가 존재해 이동 전략이 숫자 기반으로만 한정됨
3. 추상 클래스 구조로 인해 코드가 복잡해 이해가 어려움
4. 이동 전략의 외부 주입 코드가 불명확하여 책임이 불명확함

#### **After: MoveStrategy에서 이동 조건 통합 관리 및 주입 지점 통일**

-   변경 지점:
    -   ✅ MoveStrategy에서 이동 조건과 관련된 모든 로직 통합 관리  
        (이동 여부 판단 함수, 인자 생성 함수, 이동 거리 포함)
    -   ✅ 추상 클래스에서 구체 클래스로 변경해 간결화하고 new 키워드로 인스턴스 생성
    -   ✅ Car 인스턴스에서 이동 시 주입 받은 MoveStrategy 인스턴스를 참조

```javascript
// Car.js
export default class Car {
    #position;

    #move(step) {
        this.#position += step;
    }

    tryMove(moveStrategy) {
        if (moveStrategy.isMovable()) {
            this.#move(moveStrategy.step);
        }
    }
}
```

```

-   ✅ MoveStrategy 주입 지점을 RacingGame constructor로 제한하여 일관성 유지

---

### 3. MVC 패턴에 따라 Error 객체 분리 및 에러 처리를 위한 공통 인터페이스 추가

#### **Before: MVC 패턴에 따라 Error의 영역 분리가 이뤄지지 않음**

-   이전 코드에서는, 어플리케이션 레벨의 src/RuntimeError.js를 Model/ValidationError.js에서 참조했습니다.
-   MVC 패턴을 사용하였음에도 불구하고, View에서 에러가 발생한 경우 Model/ValidationError.js 모듈을 사용했습니다.
-   영역 혼재로 인해 유지보수와 디버깅이 어려웠습니다.

#### **After: Error 객체 분리 및 공통 에러 처리를 위한 인터페이스 구현**

-   변경 지점:
    -   ✅ RuntimeError를 상속하여 View와 Model 각각 ValidationError 객체 구현해 별도 관리
    -   ✅ RuntimeError에 error.type 인터페이스 추가해 Controller에서 공통 방식으로 에러 처리
    -   ✅ Controller에서 RuntimeError가 아닌 경우 프로그램 종료 처리

---

### 4. RacingGame 내부 함수의 실행 순서 보장을 위한 state 변수 도입

#### **Before: 비순차적 호출로 인한 결과 보장 불가**

-   RacingGame에서 set -> play -> getResult 순으로 순차적 실행이 필요했습니다.
-   그러나 이를 강제하는 수단이 없어, 비순차적으로 호출될 경우 원하는 결과를 보장할 수 없었습니다.

#### **After: state 변수 도입으로 순서 보장 및 에러 처리**

-   변경 지점:
    -   ✅ RacingGame에 state 변수를 추가해 비순차적 호출 시 InvalidCallOrder 에러를 발생
    -   ✅ RacingGame을 일반 함수 내보내기 모듈화 방식에서 class 모듈화 방식으로 변경

---

### 5. 테스트 코드 작성 목적을 고려한 테스트 코드 리팩토링

#### **Before: 목적을 잊은 테스트 코드 작성**

-   기존 테스트 코드에서 다음과 같은 문제점이 있었습니다.

1. 테스트 커버리지 100%에 집착하여 불필요한 테스트 작성
2. beforeEach, afterAll 사용으로 인해 코드 효율성을 추구했으나 가독성 저하와 사이드 이펙트 발생

#### **After: 테스트 목적을 고려한 리팩토링**

-   변경 지점:
    -   ✅ 불필요한 테스트 코드를 삭제하고 edge case 감지와 코드 변경 시 side effect 감지에 집중
    -   ✅ 변수화 지양하여 테스트 케이스를 바로 it에 작성
    -   ✅ beforeEach 등 지양해 네임스페이스 문제로 인한 부작용 방지

---

## 🤔 고민했던 지점 및 연관 질문

### ❓ MVC 패턴에 따른 파일 분리

-   Controller에서 CarNames와 TotalRound 파일이 사용자 입력값의 Validation을 담당하므로 View에 가는 게 적절한지 고민됩니다.
-   DefaultMoveStrategy는 Controller 폴더의 밖에 위치하는 것이 좋을까요?

---

## 👩‍💻 향후 계획

-   자동차 미션을 진행하며 [배운 사항](../TIL/LEARNED.md) 블로그 포스트 작성
-   mermaid 사용해 설계 방식 README.md에 적용

```
