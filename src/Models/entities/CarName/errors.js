import ValidationError from '../ValidationError.js';

export class CarNameNotStringError extends ValidationError {
    static #MESSAGE = 'value는 string 타입이어야합니다.';

    constructor() {
        super(CarNameNotStringError.#MESSAGE);
    }
}

export class CarNameEmptyError extends ValidationError {
    static #MESSAGE = 'value는 빈 값으로 설정할 수 없습니다.';

    constructor() {
        super(CarNameEmptyError.#MESSAGE);
    }
}

export class CarNameTooLongError extends ValidationError {
    static #MESSAGE = 'value는 5자를 초과하여 설정할 수 없습니다.';

    constructor() {
        super(CarNameTooLongError.#MESSAGE);
    }
}
