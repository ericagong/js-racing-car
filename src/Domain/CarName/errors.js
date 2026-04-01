import DomainError from '../DomainError.js';

class CarNameError extends DomainError {
    static #TYPE = '[CarNameError]';

    constructor(message) {
        super(`${CarNameError.#TYPE} ${message}`);
    }
}

export class ValueNotStringError extends CarNameError {
    static #MESSAGE = 'carName은 string 타입이어야합니다.';

    constructor() {
        super(ValueNotStringError.#MESSAGE);
    }
}

export class ValueEmptyStringError extends CarNameError {
    static #MESSAGE = 'carName은 빈 문자열로 설정할 수 없습니다.';

    constructor() {
        super(ValueEmptyStringError.#MESSAGE);
    }
}

export class ValueLengthTooLongError extends CarNameError {
    constructor(maxLength) {
        super(`carName은 ${maxLength}자를 초과하여 설정할 수 없습니다.`);
    }
}
