<p align="middle" >
  <img width="200px;" src="https://user-images.githubusercontent.com/50367798/106415730-2645a280-6493-11eb-876c-ef7172652261.png"/>
</p>
<h2 align="middle">자동차 경주 게임</h2>
<p align="middle">자바스크립트로 구현 하는 자동차 경주 게임</p>

## 프로젝트 개요

콘솔에서 동작하는 자동차 경주 게임입니다. 사용자가 자동차 이름과 라운드 수를 입력하면, 매 라운드마다 랜덤 조건에 따라 자동차가 전진하고 최종 우승자를 출력합니다.

이 프로젝트의 핵심 목표는 **가독성 중심의 설계**입니다. 코드를 읽는 사람이 "이 객체가 뭘 하는지" 한 문장으로 설명할 수 있어야 한다는 기준으로 아키텍처를 설계했습니다.

---

## 아키텍처

### MVC 기반, 실용주의 적용

MVC를 기반으로 하되 **이 프로젝트의 규모에 맞게** 조정했습니다. 별도 Service 레이어는 두지 않았고, Controller가 조율 역할을 겸합니다.

```
src/
  domain/           ← Model: 도메인 로직
  view/             ← View: 콘솔 입출력
  Controller.js     ← Controller: 파싱 + 변환 + 도메인 위임 + 에러 핸들링
  moveStrategies.js ← 게임 설정 (이동 전략)
  AppError.js       ← 에러 기반 클래스
  utils.js          ← 유틸 함수
  index.js          ← 진입점
```

### 의사결정 배경

**왜 별도 Service 레이어가 없는가?**

콘솔 앱에서 Service 레이어는 Controller와 역할이 겹칩니다. DB, 트랜잭션, 외부 API가 없기 때문에 별도 조율 계층을 두면 파일만 늘고 가독성이 떨어집니다. GameService 도입을 검토했으나, 게임 루프가 ~10줄이라 분리 시 오히려 흐름 파악이 어려워져 Controller에 유지했습니다.

**왜 GameService가 아닌 Controller인가?**

`handleGameInput`은 입력을 파싱/변환하고, 도메인 객체에 위임하고, 결과를 출력합니다. 이는 MVC에서 Controller의 전형적인 역할입니다. 도메인 로직 자체는 `Cars.moveAll()`, `Cars.getWinnerNames()` 등 도메인 객체가 소유합니다.

---

## 도메인 설계

### Entity vs Service 판단 기준

> "이 로직이 동작하려면 자기 자신의 상태만 알면 되는가?"
> - YES -> Entity (도메인 객체)
> - NO -> Controller (조율)

이 기준으로 모든 도메인 규칙을 entity에 배치했습니다.

### 도메인 객체 구조

```
domain/
  Car/Car.js             ← "나는 자동차다" (이름, 위치, 이동)
  CarName/CarName.js     ← "나는 자동차 이름이다" (5자 제한 검증)
  Cars/Cars.js           ← "나는 자동차들이다" (일급 컬렉션, 전체 이동, 우승자 판단)
  TotalRound/TotalRound.js ← "나는 라운드 수다" (1-10 범위 검증)
  DomainError.js         ← 도메인 에러 기반 클래스
```

### 일급 컬렉션 (Cars)

`Cars`는 `Car[]`을 유일한 필드로 감싸는 일급 컬렉션입니다. 컬렉션 수준의 비즈니스 로직(`moveAll`, `getWinnerNames`, `snapshot`)을 소유합니다.

도입 이유: 리팩토링 전에는 `Cars`가 유틸 함수 모음(service)이었고, 도메인의 "자동차들"이라는 멘탈 모델과 코드가 충돌했습니다. 일급 컬렉션으로 만들면서 "자동차들이 이동한다", "자동차들 중 우승자를 찾는다"가 코드에서 자연스럽게 읽히게 되었습니다.

### 값 객체 (CarName, TotalRound)

도메인 규칙을 소유하는 값 객체입니다. 생성 시 검증하고, 유효하지 않으면 에러를 던집니다.

`TotalRound` 도입 배경: 라운드 검증(숫자인지, 정수인지, 1-10 범위인지)이 Controller에 떠 있었고, 이를 소유하는 도메인 객체가 없었습니다. `CarName`이 이름 규칙을 자기가 검증하듯, `TotalRound`가 라운드 규칙을 소유하게 하여 일관성을 맞췄습니다.

---

## 검증 책임 분배

```
View       -> 빈 입력 체크 (콘솔 환경 의존)
Controller -> 파싱(구조 변경) + 변환(타입 변경)
Domain     -> 모든 도메인 규칙 (이름 5자, 중복, 숫자/정수/범위)
```

원칙: **환경 의존적 검증은 사용자와 가장 가까운 곳(View)에서, 도메인 규칙은 도메인 객체가 스스로 검증**합니다. Controller는 검증 책임 없이 파싱/변환만 수행합니다.

---

## View 설계

### 역할별 분리

```
view/
  templates.js   ← "뭐라고 말하는가" (메시지 상수 + 포맷 함수)
  ConsoleIO.js   ← "어떻게 말하는가" (readline, console.log)
  index.js       ← "언제, 어떤 순서로 말하는가" (출력 흐름 + 빈 입력 검증)
  ViewError.js   ← View 에러 기반 클래스
```

`templates.js`는 순수 함수만 포함하여 부수효과 없이 테스트 가능합니다. `ConsoleIO.js`는 콘솔 환경에 의존하는 입출력만 담당합니다. `index.js`가 이 둘을 조합하여 출력 흐름(순서, 개행)을 제어합니다.

---

## 이동 전략 (MoveStrategy)

### 함수화

리팩토링 전에는 `MoveStrategy` 클래스(70줄)와 에러 4개가 있었습니다. 실제로 하는 일은 "이동할지 말지 boolean 반환"뿐이라, `() => boolean` 함수 하나로 대체했습니다.

```js
// Before: 클래스 (70줄 + 에러 4개 + instanceof 체크)
const strategy = new MoveStrategy(condition, argsGen, step);
car.tryMove(strategy);

// After: 함수 (1줄)
const randomMoveStrategy = () => generateRandomNumber() >= MOVE_THRESHOLD;
car.tryMove(randomMoveStrategy);
```

확장성은 유지됩니다. 라운드별 전략 교체가 필요하면 다른 함수를 전달하면 됩니다.

### 위치: src/moveStrategies.js

이동 전략은 도메인 로직이 아닙니다(도메인 객체는 `() => boolean`이면 뭐든 받음). Controller 역할도 아닙니다(입출력 처리가 아님). 게임 설정이므로 특정 계층에 속하지 않는 독립 파일로 배치했습니다.

---

## 에러 계층

```
AppError (base)
  ├── DomainError (type: 'DOMAIN')
  │     ├── CarNameError → ValueNotStringError, ValueEmptyStringError, ValueLengthTooLongError
  │     ├── CarsError → CarNamesDuplicatedError
  │     └── TotalRoundError → TotalRoundNotNumberError, TotalRoundNotIntegerError, TotalRoundOutOfRangeError
  └── ViewError (type: 'VIEW')
        └── EmptyInputError
```

Controller는 `AppError` 여부로 예상된 에러(사용자 입력 오류)와 예상하지 못한 에러(프로그램 버그)를 구분합니다. 예상된 에러는 메시지를 출력하고, 예상하지 못한 에러는 throw하여 프로그램을 종료합니다.

---

## 리팩토링 과정

PR #2 리뷰의 핵심 피드백 — "도메인 멘탈 모델과 코드 구조 충돌" — 을 해결하기 위해 4단계로 진행했습니다.

| 단계 | 핵심 | 커밋 |
|------|------|------|
| 1단계 | 멘탈 모델 일치 + 일급 컬렉션 + MoveStrategy 함수화 | `f2c11af` |
| 2단계 | 검증 책임 분리 (View/Controller/Domain) + TotalRound 값 객체 | `99911b8` |
| 3단계 | View 역할별 재구성 (templates/ConsoleIO/index) | `a31da20` |
| 4단계 | 코드 일관성 점검 + EOL 설정 + 폴더명 통일 | `d7ce343` |

### 설계 원칙

- **가독성이 최우선**: 의미를 더하지 않는 추상화는 노이즈
- **Entity는 자기 상태로 동작**: 외부 의존 없이 자기 규칙을 자기가 검증
- **게임 설정 상수는 도메인별 분산**: Entity 독립성 유지
- **YAGNI**: 현재 필요하지 않은 확장 포인트는 만들지 않음

### 삭제한 것들과 이유

| 삭제 대상 | 이유 |
|-----------|------|
| `Round` entity | 수동적 데이터 컨테이너 → 배열로 충분 |
| `MoveStrategy` 클래스 | 70줄 + 에러 4개 → `() => boolean` 함수 1줄 |
| `service/` 레이어 | entity와 구분이 단수/복수뿐, 핵심 로직 분산 |
| `validateInput.js` | 검증이 View와 Domain으로 재배치되어 불필요 |
| `GameService` (검토 후 미도입) | ~10줄 로직 분리는 파일만 늘고 가독성 저하 |
