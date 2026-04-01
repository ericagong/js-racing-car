import readline from 'readline';
import ViewError from './ViewError.js';

class EmptyInputError extends ViewError {
    constructor(fieldName) {
        super(`${fieldName}은(는) 빈 값일 수 없습니다.`);
    }
}

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const NEW_LINE = '\n';
const GUIDE_MESSAGES = Object.freeze({
    CAR_NAMES: `경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분).${NEW_LINE}`,
    ROUND_COUNT: `시뮬레이션할 라운드 수를 입력하세요.${NEW_LINE}`,
});

const readlineFromConsole = async (guideMessage) => {
    return new Promise((resolve) => {
        readlineInterface.question(guideMessage, resolve);
    });
};

const validateNotEmpty = (input, fieldName) => {
    if (input.trim() === '') throw new EmptyInputError(fieldName);
};

export const addEventHandler = async (eventHandler) => {
    const carNamesInput = await readlineFromConsole(GUIDE_MESSAGES.CAR_NAMES);
    validateNotEmpty(carNamesInput, '자동차 이름');

    const roundsInput = await readlineFromConsole(GUIDE_MESSAGES.ROUND_COUNT);
    validateNotEmpty(roundsInput, '라운드 수');

    eventHandler(carNamesInput, roundsInput);
};

export const close = () => {
    readlineInterface.close();
};
