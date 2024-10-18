import CarName from '../CarName/CarName.js';

export default class Car {
    #name;
    #position;

    static #INITIAL_POSITION = 0;

    static of(name, position = Car.#INITIAL_POSITION) {
        return new Car(name, position);
    }

    constructor(name, position = Car.#INITIAL_POSITION) {
        this.#name = CarName.of(name);
        this.#position = position;
    }

    #move(step) {
        this.#position += step;
    }

    get position() {
        return this.#position;
    }

    get name() {
        return this.#name.name;
    }

    tryMove(moveStrategy) {
        if (moveStrategy.isMovable()) {
            this.#move(moveStrategy.step);
        }
    }
}
