import ValidationError from '../ValidationError.js';
// TODO 순환 참조 이슈 발생 errors.js <-> CarName.js
// import CarName from './CarName.js';

export class CarNameNotStringError extends ValidationError {
    static #MESSAGE = '자동차 이름은 문자열이어야 합니다.';

    constructor() {
        super(CarNameNotStringError.#MESSAGE);
    }
}

export class CarNameEmptyError extends ValidationError {
    static #MESSAGE = '자동차 이름은 빈 값으로 설정할 수 없습니다.';

    constructor() {
        super(CarNameEmptyError.#MESSAGE);
    }
}

export class CarNameTooLongError extends ValidationError {
    // static #MESSAGE = `자동차 이름은 ${CarName.MAX_LENGTH}자를 초과하여 설정할 수 없습니다.`;
    static #MESSAGE = '자동차 이름은 5자를 초과하여 설정할 수 없습니다.';

    constructor() {
        super(CarNameTooLongError.#MESSAGE);
    }
}
