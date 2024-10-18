import ValidationError from '../Models/ValidationError.js';

export class MinMaxNumberNotNumberError extends ValidationError {
    static #MESSAGE = 'generateRandomNumber의 인자 min, max는 숫자여야 합니다.';

    constructor() {
        super(MinMaxNumberNotNumberError.#MESSAGE);
    }
}

export class MinNumberGreaterThanMaxNumberError extends ValidationError {
    static #MESSAGE =
        'generateRandomNumber의 인자 min은 max 보다 클 수 없습니다.';

    constructor() {
        super(MinNumberGreaterThanMaxNumberError.#MESSAGE);
    }
}

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

export class TotalRoundEmptyError extends ValidationError {
    static #MESSAGE = '사용자는 시도 횟수로 빈 값을 입력해서는 안됩니다.';

    constructor() {
        super(TotalRoundEmptyError.#MESSAGE);
    }
}

export class TotalRoundNotNumberError extends ValidationError {
    static #MESSAGE = '사용자는 시도 횟수로 숫자 형태를 입력해야합니다.';

    constructor() {
        super(TotalRoundNotNumberError.#MESSAGE);
    }
}

export class TotalRoundNotIntegerError extends ValidationError {
    static #MESSAGE = '사용자는 시도 횟수로 정수를 입력해야합니다.';

    constructor() {
        super(TotalRoundNotIntegerError.#MESSAGE);
    }
}

export class TotalRoundOutOfRangeError extends ValidationError {
    static #MESSAGE =
        '사용자는 시도 횟수로는 1 이상 10 이하의 숫자를 입력해야합니다.';

    constructor() {
        super(TotalRoundOutOfRangeError.#MESSAGE);
    }
}
