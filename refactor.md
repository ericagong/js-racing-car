# Racing Car 리팩토링 계획

## 배경

PR #2 리뷰 핵심 피드백: 도메인 멘탈 모델과 코드 구조 충돌 → 가독성 저하.

### AS-IS 문제점

- entity와 service 구분이 단수/복수 형태에 불과 (Car vs Cars)
- 멘탈 모델과 코드 불일치 → 가독성 저하
- 불필요한 디자인 패턴 (도구를 위한 코드) → 복잡성만 증가

### 설계 원칙 (확정)

- 아키텍처: MVC 기반
- 최우선 가치: **가독성**
- Entity: 자기 상태만으로 동작 가능한 도메인 객체
- Service 레이어: 별도 불필요 → Controller가 겸임 (콘솔 앱이므로)
- 게임 설정 상수: 도메인별 분산 (Entity 독립성 우선)

### Entity vs Service 판단 기준

> "이 로직이 동작하려면 자기 자신의 상태만 알면 되는가?"
>
> - YES → Entity
> - NO (외부 입력, 다른 시스템 필요) → Service (= Controller)

---

## 1단계: Entity 정리 + 멘탈 모델 일치 + 일급 컬렉션

### 목표

- [x] Entity가 아닌 것은 전부 Controller로 이동
- [x] 일급 컬렉션(Cars) 도입으로 멘탈 모델과 객체 책임 일치
- [x] `service/` 폴더, `Round` entity 삭제

### 세부 작업

#### 1-1. Cars 일급 컬렉션 entity 생성

- [x] `src/Models/entities/Cars/Cars.js` 생성
    - `#cars` 하나만 필드 (일급 컬렉션 조건)
    - `static of(names)` — 팩토리 (service/createCars 흡수)
    - `moveAll(moveStrategy)` — 전체 이동 (service/moveCars 흡수)
    - `getWinnerNames()` — 우승자 판단 (service/getWinnerCarNames 흡수)
    - `get snapshot()` — 깊은 복사 반환 (Round 스냅샷 로직 흡수)
    - 생성자에서 중복 이름 검증 (도메인 불변식)
- [x] `src/Models/entities/Cars/errors.js` 생성
    - `CarNamesDuplicatedError` (service → entity로 이동)
- [x] `__tests__/entities/Cars.test.js` 작성 및 통과 확인

#### 1-2. Controller로 입력 검증 이동

- [x] `validateCarNamesInput` 로직을 Controller로 이동
    - 중복 검증은 Cars entity에서 수행 (도메인 불변식)
    - 입력 타입/빈값 검증만 Controller로
- [x] `validateTotalRoundInput` 로직을 Controller로 이동
- [x] 입력 검증 에러 클래스 → `src/Controller/errors.js`로 이동

#### 1-3. Controller 게임 루프 수정

- [x] `Controller.js` 수정: Cars entity + 직접 게임 루프
    ```js
    const cars = Cars.of(carNames);
    const roundSnapshots = [];
    for (let i = 0; i < totalRound; i++) {
        cars.moveAll(moveStrategy);
        roundSnapshots.push(cars.snapshot);
    }
    const winnerNames = cars.getWinnerNames();
    ```

#### 1-4. 삭제

- [x] `src/Models/service/` 폴더 전체 삭제
- [x] `src/Models/entities/Round/` 폴더 전체 삭제
- [x] `__tests__/service/` 전체 삭제
- [x] `__tests__/entities/Round.test.js` 삭제

#### 1-5. MoveStrategy 함수화 (4단계에서 앞당겨 수행)

- [x] `MoveStrategy` 클래스 → `() => boolean` 단순 함수로 변경
- [x] `moveStrategies.js` — 클래스 인스턴스 → 함수 정의 (`randomMoveStrategy`)
- [x] `Car.js` — `tryMove`가 함수를 받도록 변경, `MOVE_STEP=1` 내부 상수화
- [x] `Car/errors.js` 삭제 (TryMoveArgNotMoveStrategyError 제거)
- [x] `MoveStrategy.js`, `MoveStrategy/errors.js`, `MoveStrategy.test.js` 삭제
- [x] 테스트에서 `MoveStrategy.from(...)` → `() => true/false` 로 교체

#### 1-6. 기타

- [x] `CarName/errors.js` — `ValueLengthTooLongError`에 maxLength 주입 방식 적용
- [x] `Models/` → `Domain/`으로 리네임 (도메인 의미 명확화)
- [x] `ValidationError` → `DomainError`로 리네임 (역할 명확화)
- [x] `entities/` 폴더 제거 → Domain 바로 하위로 평탄화
- [x] `utils/utils.js` → `src/utils.js`로 단순화

#### 1-7. 검증

- [x] `npm test` 100 테스트 전체 통과
- [x] `npm start` 게임 실행 정상 동작

### 1단계 완료 후 구조

```
src/
  Controller/
    Controller.js       ← 입력 검증 + 파싱 + 게임 루프 + 출력 (의도적으로 뚱뚱, 2단계에서 분리)
    validateInput.js    ← 입력 검증 함수
    errors.js           ← 입력 검증 에러 클래스
  Domain/
    Car/Car.js          (tryMove 함수화, errors.js 삭제)
    CarName/CarName.js, errors.js (maxLength 주입)
    Cars/Cars.js, errors.js (NEW - 일급 컬렉션)
    DomainError.js      (구 ValidationError)
    moveStrategies.js   (MoveStrategy 클래스 삭제, 함수만)
  View/                 (변경 없음)
  utils.js
  RuntimeError.js
```

---

## 2단계: Controller 분리 → Game 서비스 추출

### 목표

- [ ] 뚱뚱한 Controller에서 게임 실행 로직을 Game 서비스로 분리

### 세부 작업

- [ ] Game 서비스 신설: 라운드 수 관리 + 전략 주입 + 게임 루프 + 결과 반환
- [ ] Controller 내 입력 처리 책임 분리: 유효성 검증 / 파싱 / 변환을 각각 별도 함수로 분리
- [ ] Controller: 입력 경계(검증/파싱/변환) + 출력 경계만 담당
- [ ] 폴더 구조 확정 (1단계 완료 후 결정)

### 2단계 후 Controller 모습 (예상)

```js
const cars = Cars.of(carNames);
const game = Game.of(cars, totalRound);
const { roundSnapshots, winnerNames } = game.play();
View.printGameResult(roundSnapshots, winnerNames);
```

---

## 3단계: View 리팩토링

### 목표

- [ ] View 코드 정리 (consoleReader, consoleWritter 등)
- [ ] 입출력 인터페이스 개선

---

## 4단계: 전체 일관성 점검

### 목표

- [ ] 코드 전체 일관성 확인
- [ ] 의도가 드러나는 네이밍/구조 리팩토링
- [ ] 불필요한 "패턴을 위한 패턴" 제거 (MoveStrategy는 1단계에서 완료)
