import createView from '../View/index.js';
import createRacingGame from '../Models/RacingGame/createRacingGame.js';

// TODO moveStategy를 외부주입하게 변경하고, 전략에서 숫자 생성 부분 분리
export default function createController() {
    const view = createView();

    const initiateGame = () => {
        view.addEventHandlerToInputReader(eventHandler);
    };

    // TODO movableCondition에 대한 타입 유효성 검사 로직 추가
    // TODO movableCondition 주입 지점을 어디로 할지? controllerCreator? gameCreater?
    const eventHandler = (carNames, totalRound) => {
        const movableCondition = (number) => number >= 4;
        const racingCarGame = createRacingGame(movableCondition);
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
