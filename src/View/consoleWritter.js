// consoleWritter는 내부적으로 Console.log로 출력 수행
const write = console.log;

// [componentName]Template은 Console에 출력되는 컴포넌트의 형식 정의
const dividerTemplate = () => {
    write('');
};

const resultGuideTemplate = () => {
    dividerTemplate();
    write('실행 결과');
};

// [ ] car 외부로 분리
const carRecordTemplate = ({ name, position }) => {
    write(`${name} : ${'-'.repeat(position)}`);
};

const roundTemplate = (cars) => {
    cars.forEach((car) => {
        carRecordTemplate(car);
    });
    dividerTemplate();
};

const winnerNamesTemplate = (winnerNames) => {
    write(`${winnerNames.join(', ')}가 최종 우승했습니다.`);
};

export const gameResultTemplate = (roundSnapshots, winnerCarNames) => {
    resultGuideTemplate();
    roundSnapshots.forEach((round) => {
        roundTemplate(round);
    });
    winnerNamesTemplate(winnerCarNames);
};

export const errorMessageTemplate = (errorType, errorMsg) => {
    write(`[${errorType}] ${errorMsg}`);
};
