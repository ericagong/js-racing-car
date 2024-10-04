import Car from '../Car/Car.js';
import { DuplicatedCarNameError } from './errors.js';

export default function createCars() {
    const hasDuplicate = (carNames) => {
        return new Set(carNames).size !== carNames.length;
    };

    const validateDuplicate = (carNames) => {
        if (hasDuplicate(carNames)) throw new DuplicatedCarNameError();
    };

    const from = (carNames) => {
        validateDuplicate(carNames);

        return carNames.map((carName) => Car.of(carName));
    };

    const playOnce = (cars, moveStrategies) => {
        cars.forEach((car, idx) => {
            car.tryMove(moveStrategies[idx]);
        });
    };

    const getRecord = (cars) => {
        return cars.map((car) => car.getRecord());
    };

    return {
        from,
        playOnce,
        getRecord,
    };
}
