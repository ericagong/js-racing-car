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
    Controller.js       ← 입력 검증 + 파싱 + 게임 루프 + 출력
    validateInput.js    ← 입력 검증 함수 (2단계에서 삭제 예정)
    errors.js           ← 입력 검증 에러 클래스 (2단계에서 삭제 예정)
    moveStrategies.js   ← 이동 전략 함수
  Domain/
    Car/Car.js
    CarName/CarName.js, errors.js
    Cars/Cars.js, errors.js
    DomainError.js
  View/
  AppError.js
  utils.js
```

---

## 2단계: 검증 책임 재배치 + TotalRound 값 객체

### 목표

- [ ] 검증 책임을 올바른 계층으로 재배치
- [ ] TotalRound 값 객체 도입으로 도메인 규칙 소유자 명확화
- [ ] Controller에서 파싱/변환 파이프라인 명확화

### 검증 책임 원칙

```
View       → 빈 입력 체크 (환경 의존, 콘솔 고정)
Controller → 파싱(구조 변경) + 변환(타입 변경) + 도메인에 시키기 + 에러 핸들링
Domain     → 모든 도메인 규칙 (이름 5자, 중복, 숫자/정수/범위)
```

### 세부 작업

#### 2-1. TotalRound 값 객체 추가
- [ ] `src/Domain/TotalRound/TotalRound.js` 생성
- [ ] `src/Domain/TotalRound/errors.js` 생성
- [ ] `__tests__/Domain/TotalRound.test.js` 생성

#### 2-2. View — 빈 입력 체크 추가
- [ ] `src/View/consoleReader.js`에 빈 입력 시 에러 처리

#### 2-3. Controller — 정리
- [ ] 파싱/변환 함수를 Controller.js 상단에 정의
- [ ] validateInput 호출 제거 → TotalRound.of(), Cars.of()가 도메인 검증 수행

#### 2-4. 삭제
- [ ] `src/Controller/validateInput.js`
- [ ] `src/Controller/errors.js`
- [ ] `__tests__/Controller/validateInput.test.js`

#### 2-5. 테스트 폴더 정리
- [ ] `__tests__/entities/` → `__tests__/Domain/`으로 리네임

#### 2-6. 검증
- [ ] `npm test` 전체 통과
- [ ] `npm start` 게임 실행 정상 동작

### 2단계 완료 후 구조

```
Controller/
  Controller.js       ← 파싱 + 변환 + 도메인에 시키기 + 에러 핸들링
  moveStrategies.js
Domain/
  Car/
  CarName/
  Cars/
  TotalRound/         (NEW)
  DomainError.js
View/
  consoleReader.js    ← 빈 입력 체크 추가
  consoleWritter.js
  index.js
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
