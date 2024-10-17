import { splitAndTrim, isString, isEmptyString } from '../utils/utils.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    CarNamesDuplicatedError,
} from './errors.js';

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
