import RuntimeError from '../../RuntimeError.js';

export class RoundCountEmptyError extends RuntimeError {
    static MESSAGE =
        '총 라운드 수를 입력하지 않으면, 프로그램이 동작할 수 없습니다.';

    constructor() {
        super(RoundCountEmptyError.MESSAGE);
    }
}

export class RoundCountNotNumberError extends RuntimeError {
    static MESSAGE = '시도 횟수로는 숫자를 입력해주세요.';

    constructor() {
        super(RoundCountNotNumberError.MESSAGE);
    }
}

export class RoundCountNotIntegerError extends RuntimeError {
    static MESSAGE = '시도 횟수로는 정수를 입력해주세요.';

    constructor() {
        super(RoundCountNotIntegerError.MESSAGE);
    }
}

export class RoundCountOutOfRangeError extends RuntimeError {
    static MESSAGE = '시도 횟수로는 1 이상 10 이하의 숫자를 입력해주세요.';

    constructor() {
        super(RoundCountOutOfRangeError.MESSAGE);
    }
}
