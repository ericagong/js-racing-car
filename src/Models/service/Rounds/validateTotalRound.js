import { isEmptyValue } from '../../utils/utils.js';
import {
    TotalRoundEmptyError,
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
} from './errors.js';

const ROUNDS_MIN = 1;
const ROUNDS_MAX = 10;
const isOutOfBoundary = (totalRound) => {
    return totalRound < ROUNDS_MIN || totalRound > ROUNDS_MAX;
};

export default function validateTotalRound(totalRound) {
    if (isEmptyValue(totalRound)) throw new TotalRoundEmptyError();
    const converted = Number(totalRound);
    if (Number.isNaN(converted)) throw new TotalRoundNotNumberError();
    if (!Number.isInteger(converted)) throw new TotalRoundNotIntegerError();
    if (isOutOfBoundary(converted)) throw new TotalRoundOutOfRangeError();
}
