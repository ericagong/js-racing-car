import ValidationError from '../Models/ValidationError.js';

export class MinMaxNumberNotNumberError extends ValidationError {
    static #MESSAGE = 'generateRandomNumber의 인자 min, max는 숫자여야 합니다.';

    constructor() {
        super(MinMaxNumberNotNumberError.#MESSAGE);
    }
}

export class MinNumberGreaterThanMaxNumberError extends ValidationError {
    static #MESSAGE =
        'generateRandomNumber의 인자 min은 max 보다 클 수 없습니다.';

    constructor() {
        super(MinNumberGreaterThanMaxNumberError.#MESSAGE);
    }
}
