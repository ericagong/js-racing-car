import Car from '../../entities/Car/Car.js';

export default function createCars(carNames) {
    return carNames.map((carName) => Car.of(carName));
}
