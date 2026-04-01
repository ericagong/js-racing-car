import CarName from '../CarName/CarName.js';

export default class Car {
    #name;
    #position;

    static #INITIAL_POSITION = 0;
    static #MOVE_STEP = 1;

    static of(name, position = Car.#INITIAL_POSITION) {
        return new Car(name, position);
    }

    constructor(name, position = Car.#INITIAL_POSITION) {
        this.#name = CarName.of(name);
        this.#position = position;
    }

    #move() {
        this.#position += Car.#MOVE_STEP;
    }

    tryMove(moveStrategy) {
        if (moveStrategy()) {
            this.#move();
        }
    }

    get name() {
        return this.#name.value;
    }

    get position() {
        return this.#position;
    }
}
