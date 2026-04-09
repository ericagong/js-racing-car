import DomainError from '../DomainError.js';

class TotalRoundError extends DomainError {
    static #TYPE = '[TotalRoundError]';

    constructor(message) {
        super(`${TotalRoundError.#TYPE} ${message}`);
    }
}

export class TotalRoundNotNumberError extends TotalRoundError {
    static #MESSAGE = 'totalRound는 Number 타입이어야합니다.';

    constructor() {
        super(TotalRoundNotNumberError.#MESSAGE);
    }
}

export class TotalRoundNotIntegerError extends TotalRoundError {
    static #MESSAGE = 'totalRound는 정수 형태이어야합니다.';

    constructor() {
        super(TotalRoundNotIntegerError.#MESSAGE);
    }
}

export class TotalRoundOutOfRangeError extends TotalRoundError {
    constructor(min, max) {
        super(`totalRound는 [${min}, ${max}] 사이의 값이어야합니다.`);
    }
}
