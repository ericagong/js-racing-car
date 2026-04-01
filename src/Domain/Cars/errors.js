import DomainError from '../DomainError.js';

class CarsError extends DomainError {
    static #TYPE = '[CarsError]';

    constructor(message) {
        super(`${CarsError.#TYPE} ${message}`);
    }
}

export class CarNamesDuplicatedError extends CarsError {
    static #MESSAGE = 'carNames는 중복되지 않은 이름으로 설정해야합니다.';

    constructor() {
        super(CarNamesDuplicatedError.#MESSAGE);
    }
}
