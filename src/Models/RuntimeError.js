export default class RuntimeError extends Error {
    #type;
    #message;

    constructor(message) {
        super(message);
        this.#type = this.constructor.name;
        this.#message = message;
    }

    getType() {
        return this.#type;
    }

    getMessage() {
        return this.#message;
    }
}
