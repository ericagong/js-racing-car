import ValidationError from '../ValidationError';

class CarError extends ValidationError {
    static #type = 'CAR';

    constructor(message) {
        super(`${CarError.#type} ${message}`);
    }
}

export class TryMoveArgNotMoveStrategyError extends CarError {
    static #message = 'tryMove의 인자를 moveStrategy 인스턴스여야합니다.';

    constructor() {
        super(TryMoveArgNotMoveStrategyError.#message);
    }
}
