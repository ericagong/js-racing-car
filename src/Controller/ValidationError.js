import RuntimeError from '../RuntimeError.js';

// 사용자 입력값 검증 오류
export default class ValidationError extends RuntimeError {
    static #type = 'USER_INPUT';

    constructor(message) {
        super(`${ValidationError.#type}`, message);
    }
}
