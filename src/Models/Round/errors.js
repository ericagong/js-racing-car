import ValidationError from '../ValidationError.js';

export class RoundIndexNotNumberError extends ValidationError {
    static #MESSAGE = '라운드 인덱스로 숫자 타입을 입력해주세요.';

    constructor() {
        super(RoundIndexNotNumberError.#MESSAGE);
    }
}
