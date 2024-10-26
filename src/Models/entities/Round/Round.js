import { isNumber, isPositive, isEmptyArray } from '../../utils/utils.js';
import {
    IndexNotNumberError,
    IndexNotIntegerError,
    IndexNotPositiveError,
    CarsNotArrayError,
    CarsEmptyArrayError,
    CarsElementNotCarError,
} from './errors.js';
import Car from '../Car/Car.js';

export default class Round {
    #index;
    #snapshot;

    static of(index) {
        return new Round(index);
    }

    static #validateIndex(index) {
        if (!isNumber(index)) throw new IndexNotNumberError();
        if (!Number.isInteger(index)) throw new IndexNotIntegerError();
        if (!isPositive(index)) throw new IndexNotPositiveError();
    }

    static #carsElementNotCar(cars) {
        return cars.some((car) => !(car instanceof Car));
    }

    static #validateCars(cars) {
        if (!Array.isArray(cars)) throw new CarsNotArrayError();
        if (isEmptyArray(cars)) throw new CarsEmptyArrayError();
        if (Round.#carsElementNotCar(cars)) throw new CarsElementNotCarError();
    }

    static #deepCopyCars(cars) {
        return cars.map((car) => ({ name: car.name, position: car.position }));
    }

    constructor(index) {
        Round.#validateIndex(index);

        this.#index = index;
        this.#snapshot = [];
    }

    get index() {
        return this.#index;
    }

    set snapshot(cars) {
        Round.#validateCars(cars);

        this.#snapshot = Round.#deepCopyCars(cars);
    }

    get snapshot() {
        return this.#snapshot;
    }
}
