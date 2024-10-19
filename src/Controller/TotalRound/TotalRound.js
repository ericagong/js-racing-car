import { isEmptyValue } from '../../Models/utils/utils.js';
import {
    TotalRoundEmptyError,
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
} from './errors.js';

export const convertToNumber = (totalRound) => {
    return Number(totalRound);
};

const ROUNDS_MIN = 1;
const ROUNDS_MAX = 10;
const isOutOfBoundary = (totalRound) => {
    return totalRound < ROUNDS_MIN || totalRound > ROUNDS_MAX;
};

export const validateTotalRound = (totalRound) => {
    if (isEmptyValue(totalRound)) throw new TotalRoundEmptyError();

    totalRound = convertToNumber(totalRound);
    if (Number.isNaN(totalRound)) throw new TotalRoundNotNumberError();
    if (!Number.isInteger(totalRound)) throw new TotalRoundNotIntegerError();
    if (isOutOfBoundary(totalRound)) throw new TotalRoundOutOfRangeError();
};
