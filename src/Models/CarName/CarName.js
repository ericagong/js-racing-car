import {
    CarNameNotStringError,
    CarNameEmptyError,
    CarNameTooLongError,
} from './errors.js';

export default class CarName {
    #name;

    static of(name) {
        return new CarName(name);
    }

    constructor(name) {
        this.#validate(name);
        this.#name = name.trim();
    }

    #isNotString(name) {
        return typeof name !== 'string';
    }

    #isEmpty(name) {
        return name.trim().length === 0;
    }

    static name_MAX_LENGTH = 5;
    #isTooLong(name) {
        return name.trim().length > CarName.name_MAX_LENGTH;
    }

    #validate(name) {
        if (this.#isNotString(name)) throw new CarNameNotStringError();
        if (this.#isEmpty(name)) throw new CarNameEmptyError();
        if (this.#isTooLong(name)) throw new CarNameTooLongError();
    }

    getName() {
        return this.#name;
    }
}
