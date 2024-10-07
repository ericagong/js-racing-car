import CarName from '../CarName/CarName.js';

export default class Car {
    #name = '';
    #position = 0;

    static INITIAL_POSITION = 0;
    static MOVE_STEP = 1; // TODO: Car 책임 소재인지 점검

    static of(name, position = Car.INITIAL_POSITION) {
        return new Car(name, position);
    }

    constructor(name, position = Car.INITIAL_POSITION) {
        this.#name = CarName.of(name);
        this.#position = position;
    }

    #move() {
        this.#position += Car.MOVE_STEP;
    }

    getName() {
        return this.#name.getName();
    }

    getPosition() {
        return this.#position;
    }

    tryMove(moveStrategy) {
        if (moveStrategy.isMovable()) {
            this.#move();
        }
    }
}
