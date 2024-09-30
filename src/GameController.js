import createView from './View/index.js';
import createGame from './Models/Game/Game.js';

export default function createGameController() {
    const view = createView();

    function initiateGame() {
        view.addEventHandlerToInputReader(gameEventHandler);
    }

    function gameEventHandler(carNames, totalRounds) {
        const { setGame, playGame, getGameResult } = createGame();
        try {
            setGame(carNames, totalRounds);
            playGame();
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
