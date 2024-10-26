import { isEmptyValue } from '../../utils/utils.js';
import {
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

export default function validateTotalRound(totalRound) {
    if (isEmptyValue(totalRound)) throw new TotalRoundEmptyError();
    const converted = Number(totalRound);
    if (Number.isNaN(converted)) throw new TotalRoundNotNumberError();
    if (!Number.isInteger(converted)) throw new TotalRoundNotIntegerError();
    if (isOutOfBoundary(converted)) throw new TotalRoundOutOfRangeError();
}
