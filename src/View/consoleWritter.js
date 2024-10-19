const write = console.log;

export default function createConsoleWritter() {
    function dividerTemplate() {
        write('');
    }

    function resultGuideTemplate() {
        dividerTemplate();

        write('실행 결과');
    }

    function carRecordTemplate(car) {
        write(`${car.name} : ${'-'.repeat(car.position)}`);
    }

    function roundTemplate(cars) {
        cars.forEach((car) => {
            carRecordTemplate(car);
        });

        dividerTemplate();
    }

    function winnerNamesTemplate(winnerCarNames) {
        write(`${winnerCarNames.join(', ')}가 최종 우승했습니다.`);
    }

    function gameResultTemplate(result) {
        resultGuideTemplate();

        const { roundSnapshots, winnerCarNames } = result;

        roundSnapshots.forEach((round) => {
            roundTemplate(round);
        });

        winnerNamesTemplate(winnerCarNames);
    }

    function errorMessageTemplate(errorType, errorMsg) {
        write(`[${errorType}] ${errorMsg}`);
    }

    return {
        gameResultTemplate,
        errorMessageTemplate,
    };
}
