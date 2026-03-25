import RuntimeError from './RuntimeError.js';

export default class ValidationError extends RuntimeError {
    #type;
    #message;

    constructor(message) {
        super(message);
        this.#type = this.constructor.name;
        this.#message = message;
    }
}
