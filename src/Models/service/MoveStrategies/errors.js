import ValidationError from '../ValidationError.js';

export class MoveStrategiesNotArrayError extends ValidationError {
    static #MESSAGE = '이동 전략들은 배열 형태로 입력해주세요.';

    constructor() {
        super(MoveStrategiesNotArrayError.#MESSAGE);
    }
}

export class MoveStrategiesElementNotMoveStrategyError extends ValidationError {
    static #MESSAGE =
        '이동 전략들은 MoveStrategy의 인스턴스로 구성되어야합니다.';

    constructor() {
        super(MoveStrategiesElementNotMoveStrategyError.#MESSAGE);
    }
}

export class MoveStrategiesLengthError extends ValidationError {
    static #MESSAGE = '이동 전략의 개수는 자동차의 수와 같아야합니다.';

    constructor() {
        super(MoveStrategiesLengthError.#MESSAGE);
    }
}
