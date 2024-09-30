import createView from './View';
import { createGame } from './Models/Game';

export default function createGameController() {
    const view = createView();

    function initiateGame() {
        view.addEventHandlerToInputReader(play);
    }

    function handleResult(result) {
        view.printGameResult(result);
    }

    function handleError(error) {
        view.printErrorMessage(error.getMessage());
    }

    function terminateGame() {
        view.closeInputReader();
    }

    function play(carNames, totalRounds) {
        const { setGame, playGame, getGameResult } = createGame();
        try {
            setGame(carNames, totalRounds);
            playGame();
            handleResult(getGameResult());
            terminateGame();
        } catch (error) {
            handleError(error);
            initiateGame();
        }
    }

    return {
        initiateGame,
    };
}
