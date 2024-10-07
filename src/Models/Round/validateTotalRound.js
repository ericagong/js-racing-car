import {
    TotalRoundEmptyError,
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
} from './errors.js';

const isEmpty = (totalRound) => {
    return (
        totalRound === null ||
        totalRound === undefined ||
        (typeof totalRound === 'string' && totalRound.trim() === '')
    );
};

const isNotNumber = (totalRound) => {
    return Number.isNaN(Number(totalRound));
};

const isNotInteger = (totalRound) => {
    return !Number.isInteger(Number(totalRound));
};

const ROUNDS_MIN = 1;
const ROUNDS_MAX = 10;
const isOutOfBoundary = (totalRound) => {
    const count = Number(totalRound);
    return count < ROUNDS_MIN || count > ROUNDS_MAX;
};

// TODO 숫자 형태의 문자열 예외처리
export default function validateRoundCount(totalRound) {
    if (isEmpty(totalRound)) throw new TotalRoundEmptyError();
    if (isNotNumber(totalRound)) throw new TotalRoundNotNumberError();
    if (isNotInteger(totalRound)) throw new TotalRoundNotIntegerError();
    if (isOutOfBoundary(totalRound)) throw new TotalRoundOutOfRangeError();
}
