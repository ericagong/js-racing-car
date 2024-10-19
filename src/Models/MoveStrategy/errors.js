import ValidationError from '../ValidationError.js';

export class MovableConditionNotFunctionError extends ValidationError {
    static #MESSAGE = 'movableCondition은 함수 형태여야 합니다.';

    constructor() {
        super(MovableConditionNotFunctionError.#MESSAGE);
    }
}

export class GenerateConditionArgsNotFunctionError extends ValidationError {
    static #MESSAGE = 'generateConditionArgs는 함수 형태여야 합니다.';

    constructor() {
        super(GenerateConditionArgsNotFunctionError.#MESSAGE);
    }
}

export class StepNotNumberError extends ValidationError {
    static #MESSAGE = 'step은 숫자여야 합니다.';

    constructor() {
        super(StepNotNumberError.#MESSAGE);
    }
}

export class StepNotIntegerError extends ValidationError {
    static #MESSAGE = 'step은 정수여야 합니다.';

    constructor() {
        super(StepNotIntegerError.#MESSAGE);
    }
}
