import ValidationError from '../ValidationError.js';
import InvalidCallOrderError from '../InvalidCallOrderError.js';

export class RoundIndexNotNumberError extends ValidationError {
    static #MESSAGE = '라운드 인덱스로 숫자 타입을 입력해주세요.';

    constructor() {
        super(RoundIndexNotNumberError.#MESSAGE);
    }
}

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

export class MovesStrategiesLengthError extends ValidationError {
    static #MESSAGE = '이동 전략의 개수는 자동차의 수와 같아야합니다.';

    constructor() {
        super(MovesStrategiesLengthError.#MESSAGE);
    }
}

export class NotSetStateError extends InvalidCallOrderError {
    static #MESSAGE =
        'play 함수는 SET 상태에서만 호출할 수 있습니다. 호출 순서를 지켜주세요.';

    constructor() {
        super(NotSetStateError.#MESSAGE);
    }
}

export class NotPlayedStateError extends InvalidCallOrderError {
    static #MESSAGE =
        'getResult 함수는 PLAYED 상태에서만 호출할 수 있습니다. 호출 순서를 지켜주세요.';

    constructor() {
        super(NotPlayedStateError.#MESSAGE);
    }
}
