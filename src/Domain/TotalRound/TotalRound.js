import { isNumber } from '../../utils.js';
import {
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
} from './errors.js';

export default class TotalRound {
    #value;

    static #MIN = 1;
    static #MAX = 10;

    static of(value) {
        return new TotalRound(value);
    }

    static #isOutOfRange(value) {
        return value < TotalRound.#MIN || value > TotalRound.#MAX;
    }

    static #validate(value) {
        if (!isNumber(value) || Number.isNaN(value))
            throw new TotalRoundNotNumberError();
        if (!Number.isInteger(value)) throw new TotalRoundNotIntegerError();
        if (TotalRound.#isOutOfRange(value))
            throw new TotalRoundOutOfRangeError(
                TotalRound.#MIN,
                TotalRound.#MAX,
            );
    }

    constructor(value) {
        TotalRound.#validate(value);

        this.#value = value;
    }

    get value() {
        return this.#value;
    }
}
