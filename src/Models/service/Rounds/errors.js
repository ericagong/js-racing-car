import ValidationError from '../ValidationError.js';

export class TotalRoundEmptyError extends ValidationError {
    static #MESSAGE = 'totalRound는 빈 값이어서는 안됩니다.';

    constructor() {
        super(TotalRoundEmptyError.#MESSAGE);
    }
}

export class TotalRoundNotNumberError extends ValidationError {
    static #MESSAGE = 'totalRound는 Number 타입이어야합니다.';

    constructor() {
        super(TotalRoundNotNumberError.#MESSAGE);
    }
}

export class TotalRoundNotIntegerError extends ValidationError {
    static #MESSAGE = 'totalRound는 정수 형태이어야합니다.';

    constructor() {
        super(TotalRoundNotIntegerError.#MESSAGE);
    }
}

export class TotalRoundOutOfRangeError extends ValidationError {
    static #MESSAGE = 'totalRounds는 [1, 10] 사이의 값이어야합니다.';

    constructor() {
        super(TotalRoundOutOfRangeError.#MESSAGE);
    }
}
