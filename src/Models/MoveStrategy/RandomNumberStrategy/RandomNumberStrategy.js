import MoveStrategy from '../MoveStrategy.js';
import { isNumber } from '../../utils/utils.js';
import generateRandomNumber from './generateRandomNumber.js';
import {
    MinMaxNumberNotNumberError,
    MinNumberGreaterThanMaxNumberError,
} from './errors.js';

export default class RandomNumberStrategy extends MoveStrategy {
    #min;
    #max;

    constructor(movableCondition, min = 0, max = 9) {
        super(movableCondition);

        this.#validateNumber(min, max);

        this.#min = min;
        this.#max = max;
    }

    #isNumber(min, max) {
        return !isNumber(min) || !isNumber(max);
    }

    #isMaxGreaterThanMin(min, max) {
        return min > max;
    }

    #validateNumber(min, max) {
        if (this.#isNumber(min, max)) throw new MinMaxNumberNotNumberError();
        if (this.#isMaxGreaterThanMin(min, max))
            throw new MinNumberGreaterThanMaxNumberError();
    }

    isMovable() {
        const movableFunc = this.getMovableCondition();
        return movableFunc(generateRandomNumber(this.#min, this.#max));
    }
}
