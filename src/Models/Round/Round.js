// TODO index 숫자인지 validation
export default class Round {
    #index = 0;
    #snapshot = [];

    static of(index) {
        return new Round(index);
    }

    constructor(index) {
        this.#index = index;
    }

    static #moveCars(cars, moveStrategies) {
        return cars.map((car, i) => {
            return car.tryMove(moveStrategies[i]);
        });
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
