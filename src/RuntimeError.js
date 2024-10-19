export default class RuntimeError extends Error {
    static type = 'RUNTIME';
    #type;
    #message;

    constructor(type, message) {
        super(message);
        this.#type = type ? type : RuntimeError.type;
        this.#message = message;
    }

    getType() {
        return this.#type;
    }

    getMessage() {
        return this.#message;
    }
}
