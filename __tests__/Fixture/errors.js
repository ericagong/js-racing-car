import ValidationError from '../../src/Models/ValidationError.js';

export class StrategiesNotStringError extends ValidationError {
    static MESSAGE = 'strategies는 문자열이어야 합니다.';

    constructor() {
        super(StrategiesNotStringError.MESSAGE);
    }
}

export class StrategyElementNotRorNumericError extends ValidationError {
    static MESSAGE = 'strategies의 원소는 R 또는 0~9의 숫자여야 합니다.';

    constructor() {
        super(StrategyElementNotRorNumericError.MESSAGE);
    }
}

export class FixedNumberIsNotNumberError extends ValidationError {
    static MESSAGE = 'fixedNumber는 숫자여야 합니다.';

    constructor() {
        super(FixedNumberIsNotNumberError.MESSAGE);
    }
}
