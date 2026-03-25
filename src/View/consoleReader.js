import readline from 'readline';

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export default function createConsoleReader() {
    const GUIDE_MESSAGES = Object.freeze({
        CAR_NAMES:
            '경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분).\n',
        TOTAL_ROUNDS: '시도할 회수는 몇회인가요?\n',
    });

    async function readlineFromConsole(guideMessage) {
        return new Promise((resolve) => {
            readlineInterface.question(guideMessage, resolve);
        });
    }

    async function addEventHandler(eventHandler) {
        const carNamesInput = await readlineFromConsole(
            GUIDE_MESSAGES.CAR_NAMES,
        );
        const roundsInput = await readlineFromConsole(
            GUIDE_MESSAGES.TOTAL_ROUNDS,
        );

        eventHandler(carNamesInput, roundsInput);
    }

    function close() {
        readlineInterface.close();
    }

    return {
        addEventHandler,
        close,
    };
}
