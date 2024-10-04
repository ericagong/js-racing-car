import createView from './View/index.js';
import createGame from './Models/Game/createGame.js';

export default function createGameController() {
    const view = createView();

    function initiateGame() {
        view.addEventHandlerToInputReader(gameEventHandler);
    }

    function gameEventHandler(carNames, totalRounds) {
        const { set, play, getGameResult } = createGame();
        try {
            set(carNames, totalRounds);
            play();
            view.printGameResult(getGameResult());
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
