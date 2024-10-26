import ValidationError from '../ValidationError.js';

class MoveStrategyError extends ValidationError {
    static #TYPE = 'MoveStrategyError';

    constructor(message) {
        super(`${MoveStrategyError.#TYPE} ${message}`);
    }
}

export class MovableConditionNotFunctionError extends MoveStrategyError {
    static #MESSAGE = 'movableCondition은 function 타입이어야합니다.';

    constructor() {
        super(MovableConditionNotFunctionError.#MESSAGE);
    }
}

export class GenerateConditionArgsNotFunctionError extends MoveStrategyError {
    static #MESSAGE = 'generateConditionArgs는 function 타입이어야합니다.';

    constructor() {
        super(GenerateConditionArgsNotFunctionError.#MESSAGE);
    }
}

export class StepNotNumberError extends MoveStrategyError {
    static #MESSAGE = 'step은 number 타입이어야합니다.';

    constructor() {
        super(StepNotNumberError.#MESSAGE);
    }
}

export class StepNotIntegerError extends ValidationError {
    static #MESSAGE = 'step은 정수 형태이어야 합니다.';

    constructor() {
        super(StepNotIntegerError.#MESSAGE);
    }
}
