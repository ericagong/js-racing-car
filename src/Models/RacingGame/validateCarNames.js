import { splitAndTrim, isString, isEmptyString } from '../utils/utils.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    CarNamesDuplicatedError,
} from '../Cars/errors.js';

export const CAR_NAMES_SEPERATOR = ',';
const hasDuplicate = (carNames) => {
    const carNamesArr = splitAndTrim(carNames, CAR_NAMES_SEPERATOR);
    return new Set(carNamesArr).size !== carNamesArr.length;
};

export default function validateCarNames(carNames) {
    if (!isString(carNames)) throw new CarNamesNotStringError();
    if (isEmptyString(carNames)) throw new CarNamesEmptyStringError();
    if (hasDuplicate(carNames)) throw new CarNamesDuplicatedError();
}

// TODO map에 Car.of 직접 전달 시, 메서드가 함수로서 호출되어, this binding 깨짐
// Car 인스턴스가 아닌 this가 전역 객체 가리킴
// 해결 시도
// 1. CarNamesArr.map(Car.of.bind(Car)) -> 실패
// 2. carName => car.of(carName) -> 성공
// Tip) map에 되도록이면 함수 직접 전달하지 않기!
// const createCar = (carName) => Car.of(carName);

// export default function createCars(carNames) {
//     validateCarNames(carNames);
//     const carNamesArr = getCarNamesArr(carNames);
//     return carNamesArr.map(createCar);
// }
