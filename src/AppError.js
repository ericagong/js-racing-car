export default class AppError extends Error {
    static type = 'APP';
    #type;
    #message;

    constructor(type, message) {
        super(message);
        this.#type = type ?? AppError.type;
        this.#message = message;
    }

    getType() {
        return this.#type;
    }

    getMessage() {
        return this.#message;
    }
}
