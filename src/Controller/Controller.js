import createView from '../View/index.js';
import {
    validateCarNames,
    validateTotalRound,
    validateMoveStrategies,
} from '../Models/service/validation.js';
import { parseAndTrim } from '../../src/Models/utils/utils.js';
import { randomNumberStrategy } from '../Models/service/moveStrategies.js';
import RuntimeError from '../RuntimeError.js';
import {
    createCars,
    playWith,
    getRoundSnapshots,
    getWinnerCarNames,
} from '../Models/service/RacingGame.js';

// 리팩토링 방향성
// [V] Controller와 Model 영역 확실히 분리 - view 까지 의존하는지 여부
// [V] moveStrategy 관련 코드 의도 드러내기
// [V] map 함수 직접 전달 형태 에러 재확인
// [V] racingGame 파일 분리
// [ ] 순환 참조 에러 : eslint rule 추가
// [ ] 코딩 컨벤션 일괄 적용

export default function createController() {
    const view = createView();

    const initiateGame = () => {
        view.addEventHandlerToInputReader(eventHandler);
    };

    const CAR_NAMES_INPUT_SEPERATOR = ',';
    const eventHandler = (carNamesInput, totalRoundInput) => {
        try {
            validateCarNames(carNamesInput);
            validateTotalRound(totalRoundInput);

            const carNames = parseAndTrim(
                carNamesInput,
                CAR_NAMES_INPUT_SEPERATOR,
            );
            const totalRound = Number(totalRoundInput);

            // ** 게임 내 이동 전략이 변경되면, RacingGame에 주입되는 MoveStrategy[#Car] 배열만 변경하면 됨 **
            // ** 각 라운드마다 각각의 자동차들은 MoveStrategies[carIdx]에 매칭되는 이동 전략에 따라 이동 **
            // ** 따라서 자동차마다 다른 이동 여부 판단 함수, 판단 함수 인자 생성 함수, 이동 크기 적용 가능 **

            // (현재) 매 라운드, 모든 자동차가 동일한 이동 전략을 사용한다고 가정해 sameStrategiesForAllRoundAndAllCars 주입
            const sameStrategiesForAllRoundAndAllCars = Array.from({
                length: carNames.length,
            }).fill(randomNumberStrategy);

            validateMoveStrategies(
                sameStrategiesForAllRoundAndAllCars,
                carNames.length,
            );

            let cars = createCars(carNames);
            let rounds = playWith(
                cars,
                totalRound,
                sameStrategiesForAllRoundAndAllCars,
            );
            const roundSnapshots = getRoundSnapshots(rounds);
            const winnerCarNames = getWinnerCarNames(cars);

            view.printGameResult({
                roundSnapshots,
                winnerCarNames,
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
