import MoveStrategy from '../MoveStrategy.js';
import { isNumber } from '../../../utils/utils.js';
import generateRandomNumber from '../../../Controller/generateRandomNumber.js';
import {
    MinMaxNumberNotNumberError,
    MinNumberGreaterThanMaxNumberError,
} from './errors.js';

export default class RandomNumberStrategy extends MoveStrategy {
    #min;
    #max;

    static #isNumber(min, max) {
        return !isNumber(min) || !isNumber(max);
    }

    static #isMaxGreaterThanMin(min, max) {
        return min > max;
    }

    static #validateNumber(min, max) {
        if (RandomNumberStrategy.#isNumber(min, max))
            throw new MinMaxNumberNotNumberError();
        if (RandomNumberStrategy.#isMaxGreaterThanMin(min, max))
            throw new MinNumberGreaterThanMaxNumberError();
    }

    constructor(movableCondition, min = 0, max = 9) {
        super(movableCondition);
        RandomNumberStrategy.#validateNumber(min, max);
        this.#min = min;
        this.#max = max;
    }

    isMovable() {
        const movableFunc = this.movableCondition;
        const randomNumber = generateRandomNumber(this.#min, this.#max);
        return movableFunc(randomNumber);
    }
}
