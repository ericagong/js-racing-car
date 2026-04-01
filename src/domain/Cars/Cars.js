import Car from '../Car/Car.js';
import { CarNamesDuplicatedError } from './errors.js';

export default class Cars {
    #cars;

    static of(names) {
        const cars = names.map((name) => Car.of(name));
        return new Cars(cars);
    }

    static from(cars) {
        return new Cars([...cars]);
    }

    static #isDuplicated(names) {
        return new Set(names).size !== names.length;
    }

    static #validate(names) {
        if (Cars.#isDuplicated(names)) throw new CarNamesDuplicatedError();
    }

    constructor(cars) {
        const names = cars.map((car) => car.name);
        Cars.#validate(names);
        this.#cars = cars;
    }

    moveAll(moveStrategy) {
        this.#cars.forEach((car) => car.tryMove(moveStrategy));
    }

    getWinnerNames() {
        const maxPosition = Math.max(...this.#cars.map((car) => car.position));
        return this.#cars
            .filter((car) => car.position === maxPosition)
            .map((car) => car.name);
    }

    get snapshot() {
        return this.#cars.map((car) => ({
            name: car.name,
            position: car.position,
        }));
    }
}
