import { isString, isEmptyString } from '../../Models/utils/utils.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    CarNamesDuplicatedError,
} from './errors.js';

const CAR_NAMES_SEPERATOR = ',';
export const parseCarNames = (carNamesInput) => {
    return carNamesInput
        .split(CAR_NAMES_SEPERATOR)
        .map((carName) => carName.trim());
};

const hasDuplicate = (carNamesInput) => {
    const carNamesInputArr = parseCarNames(carNamesInput);
    return new Set(carNamesInputArr).size !== carNamesInputArr.length;
};

export const validateCarNames = (carNamesInput) => {
    if (!isString(carNamesInput)) throw new CarNamesNotStringError();
    if (isEmptyString(carNamesInput)) throw new CarNamesEmptyStringError();
    if (hasDuplicate(carNamesInput)) throw new CarNamesDuplicatedError();
};
