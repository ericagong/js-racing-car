import CarName from '../CarName/CarName.js';
import MoveStrategy from '../MoveStrategy/MoveStrategy.js';
import { TryMoveArgNotMoveStrategyError } from './errors.js';

export default class Car {
    #name;
    #position;

    static #INITIAL_POSITION = 0;

    static of(name, position = Car.#INITIAL_POSITION) {
        return new Car(name, position);
    }

    static #IsInstanceOfMoveStrategy(moveStrategy) {
        return moveStrategy instanceof MoveStrategy;
    }

    static #validate(moveStrategy) {
        if (!Car.#IsInstanceOfMoveStrategy(moveStrategy))
            throw new TryMoveArgNotMoveStrategyError();
    }

    constructor(name, position = Car.#INITIAL_POSITION) {
        this.#name = CarName.of(name);
        this.#position = position;
    }

    #move(step) {
        this.#position += step;
    }

    tryMove(moveStrategy) {
        Car.#validate(moveStrategy);

        if (moveStrategy.isMovable()) {
            this.#move(moveStrategy.step);
        }
    }

    get name() {
        return this.#name.value;
    }

    get position() {
        return this.#position;
    }
}
