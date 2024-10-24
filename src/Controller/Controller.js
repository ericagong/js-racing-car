import createView from '../View/index.js';
import {
    validateCarNames,
    validateTotalRound,
} from '../Models/service/validation.js';
import { parseAndTrim } from '../Models/utils/utils.js';
import defaultMoveStrategy from '../Models/service/DefaultMoveStrategy/DefaultMoveStrategy.js';
import RacingGame from '../Models/service/RacingGame/RacingGame.js';
import RuntimeError from '../RuntimeError.js';

// 리팩토링 방향성
// [V] Controller와 Model 영역 확실히 분리 - view 까지 의존하는지 여부
// [ ] moveStrategy 관련 코드 의도 드러내기
// [ ] map 함수 직접 전달 형태 에러 재확인
// [ ] 순환 참조 에러 : eslint rule 추가
// [ ] 코딩 컨벤션 일괄 적용
export default function createController() {
    const view = createView();

    const initiateGame = () => {
        view.addEventHandlerToInputReader(eventHandler);
    };

    const eventHandler = (carNamesInput, totalRoundInput) => {
        try {
            validateCarNames(carNamesInput);
            validateTotalRound(totalRoundInput);

            const carNames = parseAndTrim(carNamesInput, ',');
            const totalRound = Number(totalRoundInput);

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
