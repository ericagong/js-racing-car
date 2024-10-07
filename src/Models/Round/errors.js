import ValidationError from '../ValidationError.js';

export class RoundCountEmptyError extends ValidationError {
    static MESSAGE = '시도 횟수로 빈 값을 입력해서는 안됩니다.';

    constructor() {
        super(RoundCountEmptyError.MESSAGE);
    }
}

export class RoundCountNotNumberError extends ValidationError {
    static MESSAGE = '시도 횟수로는 숫자를 입력해주세요.';

    constructor() {
        super(RoundCountNotNumberError.MESSAGE);
    }
}

export class RoundCountNotIntegerError extends ValidationError {
    static MESSAGE = '시도 횟수로는 정수를 입력해주세요.';

    constructor() {
        super(RoundCountNotIntegerError.MESSAGE);
    }
}

export class RoundCountOutOfRangeError extends ValidationError {
    static MESSAGE = '시도 횟수로는 1 이상 10 이하의 숫자를 입력해주세요.';

    constructor() {
        super(RoundCountOutOfRangeError.MESSAGE);
    }
}
