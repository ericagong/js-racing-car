import createView from '../View/index.js';
import createRacingGame from '../Models/RacingGame/createRacingGame.js';

export default function createController() {
    const view = createView();

    const initiateGame = () => {
        view.addEventHandlerToInputReader(eventHandler);
    };

    const eventHandler = (carNames, totalRound) => {
        const racingCarGame = createRacingGame();
        try {
            racingCarGame.set(carNames, totalRound);
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
