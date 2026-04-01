import { isString, isEmptyString, parseAndTrim } from '../../utils/utils.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    CarNamesDuplicatedError,
} from './errors.js';

const hasDuplicate = (carNames) => new Set(carNames).size !== carNames.length;

const CAR_NAMES_SEPERATOR = ',';
export default function validateCarNames(carNames) {
    if (!isString(carNames)) throw new CarNamesNotStringError();
    if (isEmptyString(carNames)) throw new CarNamesEmptyStringError();
    const parsedCarNames = parseAndTrim(carNames, CAR_NAMES_SEPERATOR);
    if (hasDuplicate(parsedCarNames)) throw new CarNamesDuplicatedError();
}
