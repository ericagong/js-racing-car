export default class Round {
    #index;
    #snapshot;

    static of(index) {
        return new Round(index);
    }

    constructor(index) {
        this.#index = index;
    }

    run(cars, moveStrategies) {
        cars.forEach((car, idx) => {
            car.tryMove(moveStrategies[idx]);
        });

        this.#takeSnapshot(cars);

        return cars;
    }

    #takeSnapshot(cars) {
        this.#snapshot = cars.map((car) => car.getRecord());
    }

    getRoundIndex() {
        return this.#index;
    }

    getSnapShot() {
        return this.#snapshot;
    }
}
