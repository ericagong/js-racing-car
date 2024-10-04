import createView from './View/index.js';
import createGame from './Models/Game/createGame.js';

export default function createGameController() {
    const view = createView();

    const initiateGame = () => {
        view.addEventHandlerToInputReader(gameEventHandler);
    };

    const gameEventHandler = (carNames, totalRounds) => {
        const racingCarGame = createGame();
        try {
            racingCarGame.set(carNames, totalRounds);
            racingCarGame.play();
            view.printGameResult(racingCarGame.getResult());
            view.closeInputReader();
        } catch (error) {
            view.printErrorMessage(error.getMessage());
            initiateGame();
        }
    };

    return {
        initiateGame,
    };
}
