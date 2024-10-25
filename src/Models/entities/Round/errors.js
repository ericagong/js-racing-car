import ValidationError from '../ValidationError.js';

class RoundError extends ValidationError {
    static #TYPE = 'RoundError';

    constructor(message) {
        super(`${RoundError.#TYPE} ${message}`);
    }
}

export class IndexNotNumberError extends RoundError {
    static #MESSAGE = 'index는 number 타입이어야합니다.';

    constructor() {
        super(IndexNotNumberError.#MESSAGE);
    }
}
