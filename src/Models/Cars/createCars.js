import Car from '../Car/Car.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    CarNamesDuplicatedError,
} from './errors.js';

// TODO 모델 중 클래스가 아닌 것도 있는데 폴더 명을 어떻게 해야할까?

const isString = (carNames) => typeof carNames === 'string';
const isEmptyString = (carNames) => carNames.trim() === '';

const stringToArray = (carNames) =>
    carNames.split(',').map((carName) => carName.trim());

const hasDuplicate = (carNames) => {
    const carNamesArr = stringToArray(carNames);
    return new Set(carNamesArr).size !== carNamesArr.length;
};

const validateCarNames = (carNames) => {
    if (!isString(carNames)) throw new CarNamesNotStringError();
    if (isEmptyString(carNames)) throw new CarNamesEmptyStringError();
    if (hasDuplicate(carNames)) throw new CarNamesDuplicatedError();
};

const createCar = (carName) => Car.of(carName);

export default function createCars(carNames) {
    validateCarNames(carNames);
    const carNamesArr = stringToArray(carNames);
    return carNamesArr.map(createCar);
}
