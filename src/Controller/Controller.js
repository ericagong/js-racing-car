import createView from '../View/index.js';
import RacingGame from '../Models/RacingGame/RacingGame.js';
import MoveStrategy from '../Models/MoveStrategy/MoveStrategy.js';
import generateRandomNumber from './generateRandomNumber.js';
import validateCarNames from './validateCarNames.js';
import validateTotalRound from './validateTotalRound.js';

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

    const eventHandler = (carNamesInput, totalRoundInput) => {
        try {
            // 사용자 입력값 검증
            // TODO console 입출력 특성 고려해 validate 함수 로직 수정
            validateCarNames(carNamesInput);
            validateTotalRound(totalRoundInput);

            // 사용자 입력값 파싱
            const carNames = carNamesInput
                .split(',')
                .map((carName) => carName.trim());
            const moveStrategies = carNames.map(() => moveStrategy);
            const totalRound = Number(totalRoundInput);

            // 게임 설정 및 실행
            const game = new RacingGame(carNames, totalRound, moveStrategies);
            game.play();

            view.printGameResult(game.getResult());
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
