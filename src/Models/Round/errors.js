import ValidationError from '../ValidationError.js';

export class TotalRoundEmptyError extends ValidationError {
    static MESSAGE = '시도 횟수로 빈 값을 입력해서는 안됩니다.';

    constructor() {
        super(TotalRoundEmptyError.MESSAGE);
    }
}

export class TotalRoundNotNumberError extends ValidationError {
    static MESSAGE = '시도 횟수로는 숫자를 입력해주세요.';

    constructor() {
        super(TotalRoundNotNumberError.MESSAGE);
    }
}

export class TotalRoundNotIntegerError extends ValidationError {
    static MESSAGE = '시도 횟수로는 정수를 입력해주세요.';

    constructor() {
        super(TotalRoundNotIntegerError.MESSAGE);
    }
}

export class TotalRoundOutOfRangeError extends ValidationError {
    static MESSAGE = '시도 횟수로는 1 이상 10 이하의 숫자를 입력해주세요.';

    constructor() {
        super(TotalRoundOutOfRangeError.MESSAGE);
    }
}
