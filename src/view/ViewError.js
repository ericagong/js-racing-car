import AppError from '../AppError.js';

export default class ViewError extends AppError {
    static #type = 'VIEW';

    constructor(message) {
        super(ViewError.#type, message);
    }
}
