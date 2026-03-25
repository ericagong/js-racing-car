export default class Round {
    #index = 0;
    #snapshot = [];

    static of(index) {
        return new Round(index);
    }

    constructor(index) {
        this.#index = index;
    }

    #takeSnapshot(cars) {
        this.#snapshot = cars.map((car) => {
            return {
                name: car.getName(),
                position: car.getPosition(),
            };
        });
    }

    run(cars, moveStrategies) {
        cars.forEach((car, idx) => {
            car.tryMove(moveStrategies[idx]);
        });

        this.#takeSnapshot(cars);

        return cars;
    }

    getRoundIndex() {
        return this.#index;
    }

    getSnapShot() {
        return this.#snapshot;
    }
}
