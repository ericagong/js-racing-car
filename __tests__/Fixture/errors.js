import ValidationError from '../../src/Models/ValidationError.js';

export class FixedNumberIsNotNumberError extends ValidationError {
    static MESSAGE = 'fixedNumber는 숫자여야 합니다.';

    constructor() {
        super(FixedNumberIsNotNumberError.MESSAGE);
    }
}
