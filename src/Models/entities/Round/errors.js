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

export class IndexNotIntegerError extends RoundError {
    static #MESSAGE = 'index는 정수 형태이어야합니다.';

    constructor() {
        super(IndexNotIntegerError.#MESSAGE);
    }
}

export class IndexNotPositiveError extends RoundError {
    static #MESSAGE = 'index는 양수 형태이어야합니다.';

    constructor() {
        super(IndexNotPositiveError.#MESSAGE);
    }
}

export class CarsNotArrayError extends RoundError {
    static #MESSAGE = 'cars는 Array 타입이어야합니다.';

    constructor() {
        super(CarsNotArrayError.#MESSAGE);
    }
}

export class CarsEmptyArrayError extends RoundError {
    static #MESSAGE = 'cars는 빈 배열 형태이면 안됩니다.';

    constructor() {
        super(CarsEmptyArrayError.#MESSAGE);
    }
}

export class CarsElementNotCarError extends RoundError {
    static #MESSAGE = 'cars의 원소는 Car 객체여야합니다.';

    constructor() {
        super(CarsElementNotCarError.#MESSAGE);
    }
}
