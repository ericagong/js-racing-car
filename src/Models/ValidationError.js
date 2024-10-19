import RuntimeError from '../RuntimeError.js';

// Model 내 데이터 검증 오류
export default class ValidationError extends RuntimeError {
    #type;
    #message;

    constructor(message) {
        super(message);
        this.#type = this.constructor.name;
        this.#message = message;
    }
}
