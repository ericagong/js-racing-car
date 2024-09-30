export default function createConsoleWritter() {
    const write = console.log;

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

    function winnerNamesTemplate(winnerNames) {
        write(winnerNames.join(', ') + '가 최종 우승했습니다.');
    }

    function gameResultTemplate(result) {
        resultGuideTemplate();

        const { roundHistory, winnerNames } = result;

        roundHistory.forEach((round) => {
            roundTemplate(round);
        });

        winnerNamesTemplate(winnerNames);
    }

    function errorMessageTemplate(errorMsg) {
        write('[ERROR]', errorMsg);
    }

    return {
        gameResultTemplate,
        errorMessageTemplate,
    };
}
