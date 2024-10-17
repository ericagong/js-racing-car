import ValidationError from '../ValidationError.js';

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
