import { isNumber } from '../../utils/utils.js';
import { IndexNotNumberError } from './errors.js';

export default class Round {
    #index;
    #snapshot;

    static of(index) {
        return new Round(index);
    }

    static #validate(index) {
        if (!isNumber(index)) throw new IndexNotNumberError();
    }

    // [ ] moveStrategy 로직 수정
    static #moveCars(cars, moveStrategies) {
        return cars.map((car, i) => {
            return car.tryMove(moveStrategies[i]);
        });
    }

    constructor(index) {
        Round.#validate(index);

        this.#index = index;
        this.#snapshot = [];
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
