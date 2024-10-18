import { isEmptyValue } from '../Models/utils/utils.js';
import {
    TotalRoundEmptyError,
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
} from '../Controller/errors.js';

const ROUNDS_MIN = 1;
const ROUNDS_MAX = 10;
const isOutOfBoundary = (totalRound) => {
    return totalRound < ROUNDS_MIN || totalRound > ROUNDS_MAX;
};

export default function validateTotalRound(totalRound) {
    if (isEmptyValue(totalRound)) throw new TotalRoundEmptyError();

    totalRound = Number(totalRound);
    if (Number.isNaN(totalRound)) throw new TotalRoundNotNumberError();
    if (!Number.isInteger(totalRound)) throw new TotalRoundNotIntegerError();
    if (isOutOfBoundary(totalRound)) throw new TotalRoundOutOfRangeError();
}
