import { isString, isEmptyString, isEmptyValue } from '../utils.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    TotalRoundEmptyError,
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
} from './errors.js';

const TOTAL_ROUND_MIN = 1;
const TOTAL_ROUND_MAX = 10;

const isOutOfBoundary = (totalRound) => {
    return totalRound < TOTAL_ROUND_MIN || totalRound > TOTAL_ROUND_MAX;
};

export function validateCarNamesInput(carNamesInput) {
    if (!isString(carNamesInput)) throw new CarNamesNotStringError();
    if (isEmptyString(carNamesInput)) throw new CarNamesEmptyStringError();
}

export function validateTotalRoundInput(totalRoundInput) {
    if (isEmptyValue(totalRoundInput)) throw new TotalRoundEmptyError();
    const converted = Number(totalRoundInput);
    if (Number.isNaN(converted)) throw new TotalRoundNotNumberError();
    if (!Number.isInteger(converted)) throw new TotalRoundNotIntegerError();
    if (isOutOfBoundary(converted)) throw new TotalRoundOutOfRangeError();
}
