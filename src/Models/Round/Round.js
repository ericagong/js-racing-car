import { isNumber } from '../utils/utils.js';
import { RoundIndexNotNumberError } from './errors.js';

export default class Round {
    #index = 0;
    #snapshot = [];

    static of(index) {
        return new Round(index);
    }

    static #validateIndex(index) {
        if (!isNumber(index)) throw new RoundIndexNotNumberError();
    }

    static #moveCars(cars, moveStrategies) {
        return cars.map((car, i) => {
            return car.tryMove(moveStrategies[i]);
        });
    }

    constructor(index) {
        Round.#validateIndex(index);
        this.#index = index;
    }

    #takeSnapshot(cars) {
        this.#snapshot = cars.map((car) => {
            return {
                name: car.name,
                position: car.position,
            };
        });
    }

    run(cars, moveStrategies) {
        Round.#moveCars(cars, moveStrategies);
        this.#takeSnapshot(cars);
        return cars;
    }

    get index() {
        return this.#index;
    }

    get snapshot() {
        return this.#snapshot;
    }
}
