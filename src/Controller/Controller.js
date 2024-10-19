import createView from '../View/index.js';
import { validateCarNames, parseCarNames } from './CarNames/CarNames.js';
import {
    validateTotalRound,
    convertToNumber,
} from './TotalRound/TotalRound.js';
import defaultMoveStrategy from './DefaultMoveStrategy.js';
import RacingGame from '../Models/RacingGame/RacingGame.js';
import RuntimeError from '../RuntimeError.js';

export default function createController() {
    const view = createView();

    const initiateGame = () => {
        view.addEventHandlerToInputReader(eventHandler);
    };

    const eventHandler = (carNamesInput, totalRoundInput) => {
        try {
            validateCarNames(carNamesInput);
            validateTotalRound(totalRoundInput);

            const carNames = parseCarNames(carNamesInput);
            const totalRound = convertToNumber(totalRoundInput);

            // 게임 내 단일 이동 전략 사용(향후 변경 시, 이 지점 변경)
            const moveStrategies = carNames.map(() => defaultMoveStrategy);

            const game = new RacingGame(carNames, totalRound, moveStrategies);
            game.play();

            view.printGameResult({
                roundSnapshots: game.getRoundSnapshots(),
                winnerCarNames: game.getWinnerCarNames(),
            });
            view.closeInputReader();
        } catch (error) {
            // 예상한 에러 - 에러 메시지 출력 후, 게임 재시작
            if (error instanceof RuntimeError) {
                console.log(error.getType(), error.getMessage());
                view.printErrorMessage(error.getType(), error.getMessage());
                initiateGame();
            }
            // 예상하지 못한 에러 - 프로그램 종료 처리
            else throw error;
        }
    };

    return {
        initiate: initiateGame,
    };
}
