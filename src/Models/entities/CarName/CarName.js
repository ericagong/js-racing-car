import { isString, isEmptyString } from '../../utils/utils.js';
import {
    CarNameNotStringError,
    CarNameEmptyError,
    CarNameTooLongError,
} from './errors.js';

export default class CarName {
    #value;

    // TODO 순환 참조 문제 해결
    static MAX_LENGTH = 5;

    static of(value) {
        return new CarName(value);
    }

    static #isTooLong(value) {
        return value.trim().length > CarName.MAX_LENGTH;
    }

    static #validate(value) {
        if (!isString(value)) throw new CarNameNotStringError();
        if (isEmptyString(value)) throw new CarNameEmptyError();
        if (CarName.#isTooLong(value)) throw new CarNameTooLongError();
    }

    constructor(value) {
        CarName.#validate(value);
        this.#value = value.trim();
    }

    get value() {
        return this.#value;
    }
}
