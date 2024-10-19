import createView from '../View/index.js';
import RacingGame from '../Models/RacingGame/RacingGame.js';
import MoveStrategy from '../Models/MoveStrategy/MoveStrategy.js';
import generateRandomNumber from './generateRandomNumber.js';
import { validateCarNames, parseCarNames } from './CarNames/CarNames.js';
import {
    validateTotalRound,
    convertToNumber,
} from './TotalRound/TotalRound.js';

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
            validateCarNames(carNamesInput);
            validateTotalRound(totalRoundInput);

            const carNames = parseCarNames(carNamesInput);
            const totalRound = convertToNumber(totalRoundInput);

            // 게임 내 단일 이동 전략 사용(향후 변경 가능)
            const moveStrategies = carNames.map(() => moveStrategy);
            const game = new RacingGame(carNames, totalRound, moveStrategies);
            game.play();

            view.printGameResult({
                roundSnapshots: game.getRoundSnapshots(),
                winnerCarNames: game.getWinnerCarNames(),
            });
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
