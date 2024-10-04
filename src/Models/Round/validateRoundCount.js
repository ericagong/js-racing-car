import {
    RoundCountEmptyError,
    RoundCountNotNumberError,
    RoundCountNotIntegerError,
    RoundCountOutOfRangeError,
} from './errors.js';

const isEmpty = (roundCount) => {
    return (
        roundCount === null ||
        roundCount === undefined ||
        (typeof roundCount === 'string' && roundCount.trim() === '')
    );
};

const isNotNumber = (roundCount) => {
    return Number.isNaN(Number(roundCount));
};

const isNotInteger = (roundCount) => {
    return !Number.isInteger(Number(roundCount));
};

const ROUNDS_MIN = 1;
const ROUNDS_MAX = 10;
const isOutOfBoundary = (roundCount) => {
    const count = Number(roundCount);
    return count < ROUNDS_MIN || count > ROUNDS_MAX;
};

// TODO 숫자 형태의 문자열 예외처리
export default function validateRoundCount(roundCount) {
    if (isEmpty(roundCount)) throw new RoundCountEmptyError();
    if (isNotNumber(roundCount)) throw new RoundCountNotNumberError();
    if (isNotInteger(roundCount)) throw new RoundCountNotIntegerError();
    if (isOutOfBoundary(roundCount)) throw new RoundCountOutOfRangeError();
}
