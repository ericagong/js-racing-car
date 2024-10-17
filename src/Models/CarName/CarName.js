import { isString, isEmptyString } from '../utils/utils.js';
import {
    CarNameNotStringError,
    CarNameEmptyError,
    CarNameTooLongError,
} from './errors.js';

export default class CarName {
    #name;

    // TODO 순환 참조 문제 해결
    static MAX_LENGTH = 5;

    static of(name) {
        return new CarName(name);
    }

    constructor(name) {
        this.#validate(name);
        this.#name = name.trim();
    }

    #isTooLong(name) {
        return name.trim().length > CarName.MAX_LENGTH;
    }

    #validate(name) {
        if (!isString(name)) throw new CarNameNotStringError();
        if (isEmptyString(name)) throw new CarNameEmptyError();
        if (this.#isTooLong(name)) throw new CarNameTooLongError();
    }

    get name() {
        return this.#name;
    }
}
