import RuntimeError from '../../../RuntimeError.js';

export class MinMaxNumberNotNumberError extends RuntimeError {
    static MESSAGE = 'min, max는 숫자여야 합니다.';

    constructor() {
        super(MinMaxNumberNotNumberError.MESSAGE);
    }
}

export class MinNumberGreaterThanMaxNumberError extends RuntimeError {
    static MESSAGE = 'min은 max 보다 클 수 없습니다.';

    constructor() {
        super(MinNumberGreaterThanMaxNumberError.MESSAGE);
    }
}
