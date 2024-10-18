import createView from '../View/index.js';
import createRacingGame from '../Models/RacingGame/createRacingGame.js';
import MoveStrategy from '../Models/MoveStrategy/MoveStrategy.js';
import generateRandomNumber from './generateRandomNumber.js';

export default function createController() {
    const view = createView();

    const initiateGame = () => {
        view.addEventHandlerToInputReader(eventHandler);
    };

    // 단일 이동 전략 적용
    const movableCondition = (number) => number >= 4;
    const step = 1;
    const moveStrategy = new MoveStrategy(
        movableCondition,
        generateRandomNumber.bind(null, 0, 9),
        step,
    );

    const eventHandler = (carNames, totalRound) => {
        const racingCarGame = createRacingGame();
        try {
            // TODO carNames에서 carNameArr 추출 로직과 totalRound 숫자 검증 로직 set 외부로 분리 -> input 값에 대한 로직
            const carNameArr = carNames
                .split(',')
                .map((carName) => carName.trim());
            const moveStrategies = carNameArr.map(() => moveStrategy);
            racingCarGame.set(carNames, totalRound, moveStrategies);
            racingCarGame.play();
            view.printGameResult(racingCarGame.getResult());
            view.closeInputReader();
        } catch (error) {
            view.printErrorMessage(error.getMessage());
            initiateGame();
        }
    };

    return {
        initiate: initiateGame,
    };
}
