import Car from '../Car/Car';
import { DuplicatedCarNameError } from './errors';

export default function createCars() {
    function hasDuplicatedCarNames(carNames) {
        return new Set(carNames).size !== carNames.length;
    }

    function validateDuplicateCarNames(carNames) {
        if (hasDuplicatedCarNames(carNames)) throw new DuplicatedCarNameError();
    }

    function from(carNames) {
        validateDuplicateCarNames(carNames);

        return carNames.map((carName) => Car.of(carName));
    }

    function playOneRound(cars, moveStrategies) {
        cars.forEach((car, idx) => {
            car.tryMove(moveStrategies[idx]);
        });
    }

    function getRoundRecord(cars) {
        return cars.map((car) => car.getRecord());
    }

    return {
        from,
        playOneRound,
        getRoundRecord,
    };
}
