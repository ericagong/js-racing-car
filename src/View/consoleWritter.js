// consoleWritter는 내부적으로 Console.log로 출력 수행
const write = console.log;

const NEW_LINE = '\n';

// [componentName]Template은 Console에 출력되는 컴포넌트의 형식 정의
const dividerTemplate = () => {
    write(NEW_LINE);
};

const resultGuideTemplate = () => {
    dividerTemplate();
    write('실행 결과');
};

const carRecordTemplate = ({ name, position }) =>
    `${name} : ${'-'.repeat(position)}`;

const roundTemplate = (cars) => {
    write(cars.map(carRecordTemplate).join(NEW_LINE));
    dividerTemplate();
};

const winnerNamesTemplate = (winnerNames) => {
    write(`${winnerNames.join(', ')}가 최종 우승했습니다.`);
};

export const gameResultTemplate = (roundSnapshots, winnerCarNames) => {
    resultGuideTemplate();
    write(roundSnapshots.map(roundTemplate).join(NEW_LINE));
    winnerNamesTemplate(winnerCarNames);
};

export const errorMessageTemplate = (errorType, errorMsg) => {
    write(`[${errorType}] ${errorMsg}`);
};
