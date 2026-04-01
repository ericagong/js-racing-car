import AppError from '../AppError.js';

class InputValidationError extends AppError {
    static #type = 'INPUT';

    constructor(message) {
        super(InputValidationError.#type, message);
    }
}

class CarNamesInputError extends InputValidationError {
    static #TYPE = '[CarNamesInputError]';

    constructor(message) {
        super(`${CarNamesInputError.#TYPE} ${message}`);
    }
}

export class CarNamesNotStringError extends CarNamesInputError {
    static #MESSAGE = 'carNames는 string 타입이어야합니다.';

    constructor() {
        super(CarNamesNotStringError.#MESSAGE);
    }
}

export class CarNamesEmptyStringError extends CarNamesInputError {
    static #MESSAGE =
        'carNames는 빈 형태의 string 타입으로 설정할 수 없습니다.';

    constructor() {
        super(CarNamesEmptyStringError.#MESSAGE);
    }
}

class TotalRoundInputError extends InputValidationError {
    static #TYPE = '[TotalRoundInputError]';

    constructor(message) {
        super(`${TotalRoundInputError.#TYPE} ${message}`);
    }
}

export class TotalRoundEmptyError extends TotalRoundInputError {
    static #MESSAGE = 'totalRound는 빈 값이어서는 안됩니다.';

    constructor() {
        super(TotalRoundEmptyError.#MESSAGE);
    }
}

export class TotalRoundNotNumberError extends TotalRoundInputError {
    static #MESSAGE = 'totalRound는 Number 타입이어야합니다.';

    constructor() {
        super(TotalRoundNotNumberError.#MESSAGE);
    }
}

export class TotalRoundNotIntegerError extends TotalRoundInputError {
    static #MESSAGE = 'totalRound는 정수 형태이어야합니다.';

    constructor() {
        super(TotalRoundNotIntegerError.#MESSAGE);
    }
}

export class TotalRoundOutOfRangeError extends TotalRoundInputError {
    static #MESSAGE = 'totalRounds는 [1, 10] 사이의 값이어야합니다.';

    constructor() {
        super(TotalRoundOutOfRangeError.#MESSAGE);
    }
}
