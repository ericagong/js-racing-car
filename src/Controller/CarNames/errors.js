import ValidationError from '../../Models/ValidationError.js';

export class CarNamesNotStringError extends ValidationError {
    static #MESSAGE = '사용자는 자동차 이름들을 문자열 형태로 입력해야합니다.';

    constructor() {
        super(CarNamesNotStringError.#MESSAGE);
    }
}

export class CarNamesEmptyStringError extends ValidationError {
    static #MESSAGE = '사용자는 빈 값으로 자동차 이름들을 입력해서는 안됩니다.';

    constructor() {
        super(CarNamesEmptyStringError.#MESSAGE);
    }
}

export class CarNamesDuplicatedError extends ValidationError {
    static #MESSAGE =
        '사용자는 자동차 이름들로 중복되지 않은 자동차 이름을 입력해야합니다.';

    constructor() {
        super(CarNamesDuplicatedError.#MESSAGE);
    }
}
