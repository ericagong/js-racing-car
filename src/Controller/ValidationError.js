import RuntimeError from '../RuntimeError.js';

// 사용자 입력값 검증 오류
export default class ValidationError extends RuntimeError {
    #type;
    #message;

    constructor(message) {
        super(message);
        this.#type = this.constructor.name;
        this.#message = message;
    }
}
