import ValidationError from '../ValidationError.js';

class CarsError extends ValidationError {
    static #TYPE = '[CarsError]';

    constructor(message) {
        super(`${CarsError.#TYPE} ${message}`);
    }
}

export class CarNamesNotStringError extends CarsError {
    static #MESSAGE = 'carNames는 string 타입이어야합니다.';

    constructor() {
        super(CarNamesNotStringError.#MESSAGE);
    }
}

export class CarNamesEmptyStringError extends CarsError {
    static #MESSAGE =
        'carNames는 빈 형태의 string 타입으로 설정할 수 없습니다.';

    constructor() {
        super(CarNamesEmptyStringError.#MESSAGE);
    }
}

export class CarNamesDuplicatedError extends CarsError {
    static #MESSAGE = 'carNames는 중복되지 않은 이름으로 설정해야합니다.';

    constructor() {
        super(CarNamesDuplicatedError.#MESSAGE);
    }
}
