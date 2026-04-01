import View from '../View/index.js';
import Cars from '../Models/service/Cars/index.js';
import Rounds from '../Models/service/Rounds/index.js';
import MoveStrategies from '../Models/service/MoveStrategies/index.js';
import { parseAndTrim } from '../Models/utils/utils.js';
import RuntimeError from '../RuntimeError.js';

const CAR_NAMES_INPUT_SEPERATOR = ',';
const runRacingGame = (carNamesInput, totalRoundInput) => {
    try {
        // 사용자 입력값에 대한 유효성 검사
        Cars.validateCarNames(carNamesInput);
        Rounds.validateTotalRound(totalRoundInput);

        // 사용자 입력값 가공
        const carNames = parseAndTrim(carNamesInput, CAR_NAMES_INPUT_SEPERATOR);
        const totalRound = Number(totalRoundInput);

        // 라운드별 이동 전략 생성
        // 라운드 별 이동전략 변경 시 moveStrategies 수정
        // 현재는 모든 라운드 이동 전략이 MoveStrategies.randomNumberStrategy로 고정
        const sameMoveStrategies = Array.from(
            { length: totalRound },
            () => MoveStrategies.randomNumberStrategy,
        );
        MoveStrategies.validateMoveStrategies(sameMoveStrategies, totalRound);

        const cars = Cars.createCars(carNames);
        const rounds = Rounds.createRounds(totalRound);

        rounds.forEach((round, i) => {
            const currRoundMoveStrategy = sameMoveStrategies[i];
            Cars.moveCars(cars, currRoundMoveStrategy);
            round.snapshot = cars;
        });

        const roundSnapshots = Rounds.getRoundSnapshots(rounds);
        const winnerCarNames = Cars.getWinnerCarNames(cars);

        View.printGameResult(roundSnapshots, winnerCarNames);

        View.closeInputReader();
    } catch (error) {
        // 예상한 에러 - 에러 메시지 출력 후, 게임 환경 다시 세팅(처음부터 재시작)
        if (error instanceof RuntimeError) {
            View.printErrorMessage(error.getType(), error.getMessage());

            setRacingGameEnvironment();
        }
        // 예상하지 못한 에러 - 프로그램 종료 처리
        else throw error;
    }
};

export default function setRacingGameEnvironment() {
    View.addEventHandlerToInputReader(runRacingGame);
}
