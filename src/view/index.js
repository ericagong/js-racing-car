import { readLine, printLine, close } from './ConsoleIO.js';
import {
    CAR_NAMES_PROMPT,
    ROUND_COUNT_PROMPT,
    RESULT_HEADER,
    formatRound,
    formatWinner,
    formatError,
} from './templates.js';
import ViewError from './ViewError.js';

class EmptyInputError extends ViewError {
    constructor(fieldName) {
        super(`${fieldName}은(는) 빈 값일 수 없습니다.`);
    }
}

const validateNotEmpty = (input, fieldName) => {
    if (input.trim() === '') throw new EmptyInputError(fieldName);
};

const View = {
    onInput: async (eventHandler) => {
        const carNamesInput = await readLine(CAR_NAMES_PROMPT);
        validateNotEmpty(carNamesInput, '자동차 이름');

        const roundsInput = await readLine(ROUND_COUNT_PROMPT);
        validateNotEmpty(roundsInput, '라운드 수');

        printLine();
        eventHandler(carNamesInput, roundsInput);
    },

    close,

    printGameResult: (roundSnapshots, winnerCarNames) => {
        printLine(RESULT_HEADER);
        roundSnapshots.forEach((round) => {
            printLine(formatRound(round));
            printLine();
        });
        printLine(formatWinner(winnerCarNames));
    },

    printErrorMessage: (errorType, errorMsg) => {
        printLine(formatError(errorType, errorMsg));
    },
};

export default View;
