// 입력 메시지
export const CAR_NAMES_PROMPT =
    '경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분).\n';

export const ROUND_COUNT_PROMPT = '시뮬레이션할 라운드 수를 입력하세요.\n';

// 출력 메시지
export const RESULT_HEADER = '실행 결과';

// 포맷 함수
const formatCarRecord = ({ name, position }) =>
    `${name} : ${'-'.repeat(position)}`;

export const formatRound = (cars) => cars.map(formatCarRecord).join('\n');

export const formatWinner = (winnerCarNames) =>
    `${winnerCarNames.join(', ')}가 최종 우승했습니다.`;

export const formatError = (errorType, errorMsg) =>
    `[${errorType}] ${errorMsg}`;
