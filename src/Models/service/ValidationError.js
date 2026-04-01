import RuntimeError from '../../RuntimeError.js';

export default class ValidationError extends RuntimeError {
    static #type = 'SERVICE';

    constructor(message) {
        super(ValidationError.#type, message);
    }
}
