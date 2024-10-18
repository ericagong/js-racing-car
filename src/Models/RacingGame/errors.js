import ValidationError from '../ValidationError.js';
import InvalidCallOrderError from '../InvalidCallOrderError.js';

export class CarNamesNotStringError extends ValidationError {
    static #MESSAGE = '자동차 이름들을 문자열 형태로 입력해야합니다.';

    constructor() {
        super(CarNamesNotStringError.#MESSAGE);
    }
}

export class CarNamesEmptyStringError extends ValidationError {
    static #MESSAGE = '빈 값으로 자동차 이름들을 입력해서는 안됩니다.';

    constructor() {
        super(CarNamesEmptyStringError.#MESSAGE);
    }
}

export class CarNamesDuplicatedError extends ValidationError {
    static #MESSAGE = '자동차 이름들이 중복되서는 안됩니다.';

    constructor() {
        super(CarNamesDuplicatedError.#MESSAGE);
    }
}

export class TotalRoundEmptyError extends ValidationError {
    static #MESSAGE = '시도 횟수로 빈 값을 입력해서는 안됩니다.';

    constructor() {
        super(TotalRoundEmptyError.#MESSAGE);
    }
}

export class TotalRoundNotNumberError extends ValidationError {
    static #MESSAGE = '시도 횟수로는 숫자를 입력해주세요.';

    constructor() {
        super(TotalRoundNotNumberError.#MESSAGE);
    }
}

export class TotalRoundNotIntegerError extends ValidationError {
    static #MESSAGE = '시도 횟수로는 정수를 입력해주세요.';

    constructor() {
        super(TotalRoundNotIntegerError.#MESSAGE);
    }
}

export class TotalRoundOutOfRangeError extends ValidationError {
    static #MESSAGE = '시도 횟수로는 1 이상 10 이하의 숫자를 입력해주세요.';

    constructor() {
        super(TotalRoundOutOfRangeError.#MESSAGE);
    }
}

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

export class NotInitialStateError extends InvalidCallOrderError {
    static #MESSAGE =
        'set 함수는 INITIAL 상태에서만 호출할 수 있습니다. 호출 순서를 지켜주세요.';

    constructor() {
        super(NotInitialStateError.#MESSAGE);
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
