import ValidationError from '../ValidationError.js';

class CarNameError extends ValidationError {
    static #TYPE = '[CarNameError]';

    constructor(message) {
        super(`${CarNameError.#TYPE} ${message}`);
    }
}

export class ValueNotStringError extends CarNameError {
    static #MESSAGE = 'value는 string 타입이어야합니다.';

    constructor() {
        super(ValueNotStringError.#MESSAGE);
    }
}

export class ValueEmptyStringError extends CarNameError {
    static #MESSAGE = 'value는 빈 값으로 설정할 수 없습니다.';

    constructor() {
        super(ValueEmptyStringError.#MESSAGE);
    }
}

export class ValueLengthTooLongError extends CarNameError {
    static #MESSAGE = 'value는 5자를 초과하여 설정할 수 없습니다.';

    constructor() {
        super(ValueLengthTooLongError.#MESSAGE);
    }
}
