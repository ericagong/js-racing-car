import MoveStrategy from '../../src/Models/MoveStrategy/MoveStrategy.js';
import { isNumber } from '../../src/Models/utils/utils.js';
import { FixedNumberIsNotNumberError } from './errors.js';

export default class FixedNumberStrategy extends MoveStrategy {
    #number;

    constructor(movableCondition, number) {
        super(movableCondition);

        this.#validateNumber(number);

        this.#number = number;
    }

    #validateNumber(number) {
        if (!isNumber(number)) throw new FixedNumberIsNotNumberError();
    }

    #generateNumber() {
        return this.#number;
    }

    isMovable() {
        const movableFunction = this.movableCondition;
        return movableFunction(this.#generateNumber());
    }
}
