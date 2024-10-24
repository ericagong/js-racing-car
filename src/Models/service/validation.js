import {
    isString,
    isEmptyString,
    isEmptyValue,
    parseAndTrim,
} from '../utils/utils.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    CarNamesDuplicatedError,
    TotalRoundEmptyError,
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
} from './errors.js';

const hasDuplicate = (input) => new Set(input).size !== input.length;

const CAR_NAMES_SEPERATOR = ',';
export const validateCarNames = (input) => {
    if (!isString(input)) throw new CarNamesNotStringError();
    if (isEmptyString(input)) throw new CarNamesEmptyStringError();
    const parsedCarNames = parseAndTrim(input, CAR_NAMES_SEPERATOR);
    if (hasDuplicate(parsedCarNames)) throw new CarNamesDuplicatedError();
};

const ROUNDS_MIN = 1;
const ROUNDS_MAX = 10;
const isOutOfBoundary = (input) => {
    return input < ROUNDS_MIN || input > ROUNDS_MAX;
};

export const validateTotalRound = (input) => {
    if (isEmptyValue(input)) throw new TotalRoundEmptyError();
    const converted = Number(input);
    if (Number.isNaN(converted)) throw new TotalRoundNotNumberError();
    if (!Number.isInteger(converted)) throw new TotalRoundNotIntegerError();
    if (isOutOfBoundary(converted)) throw new TotalRoundOutOfRangeError();
};
