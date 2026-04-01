import { isString, isEmptyString } from '../../utils.js';
import {
    ValueNotStringError,
    ValueEmptyStringError,
    ValueLengthTooLongError,
} from './errors.js';

export default class CarName {
    #value;

    static #MAX_LENGTH = 5;

    static of(value) {
        return new CarName(value);
    }

    static #isOverMaxLength(value) {
        return value.trim().length > CarName.#MAX_LENGTH;
    }

    static #validate(value) {
        if (!isString(value)) throw new ValueNotStringError();
        if (isEmptyString(value)) throw new ValueEmptyStringError();
        if (CarName.#isOverMaxLength(value))
            throw new ValueLengthTooLongError(CarName.#MAX_LENGTH);
    }

    constructor(value) {
        CarName.#validate(value);

        this.#value = value.trim();
    }

    get value() {
        return this.#value;
    }
}
