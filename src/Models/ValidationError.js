import RuntimeError from '../RuntimeError.js';

// Model 내 데이터 검증 오류
export default class ValidationError extends RuntimeError {
    static #type = 'MODEL';

    constructor(message) {
        super(`${ValidationError.#type}`, message);
    }
}
