import RuntimeError from '../../RuntimeError.js';

export class CarNamesNotStringError extends RuntimeError {
    static MESSAGE =
        '자동차 이름들을 문자열로 입력하지 않으면, 프로그램이 동작할 수 없습니다.';

    constructor() {
        super(CarNamesNotStringError.MESSAGE);
    }
}

export class CarNamesEmptyStringError extends RuntimeError {
    static MESSAGE =
        '자동차 이름들을 입력하지 않으면, 프로그램이 동작할 수 없습니다.';

    constructor() {
        super(CarNamesEmptyStringError.MESSAGE);
    }
}

export class CarNamesDuplicatedError extends RuntimeError {
    static MESSAGE = '중복된 자동차 이름으로는 프로그램이 동작할 수 없습니다.';

    constructor() {
        super(CarNamesDuplicatedError.MESSAGE);
    }
}
