import ValidationError from '../ValidationError.js';

class MoveStrategiesError extends ValidationError {
    static #TYPE = '[MoveStrategiesError]';

    constructor(message) {
        super(`${MoveStrategiesError.#TYPE} ${message}`);
    }
}

export class MoveStrategiesNotArrayError extends MoveStrategiesError {
    static #MESSAGE = 'moveStrategies가 Array 타입이 아닙니다.';

    constructor() {
        super(MoveStrategiesNotArrayError.#MESSAGE);
    }
}

export class MoveStrategiesElementNotMoveStrategyError extends MoveStrategiesError {
    static #MESSAGE =
        'moveStrategies에 MoveStrategy의 인스턴스가 아닌 요소가 있습니다.';

    constructor() {
        super(MoveStrategiesElementNotMoveStrategyError.#MESSAGE);
    }
}

export class MoveStrategiesLengthError extends MoveStrategiesError {
    static #MESSAGE = 'moveStrategies 길이는 count와 같아야합니다.';

    constructor() {
        super(MoveStrategiesLengthError.#MESSAGE);
    }
}
