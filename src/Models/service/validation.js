import {
    isString,
    isEmptyString,
    isEmptyValue,
    parseAndTrim,
    hasSameLength,
} from '../utils/utils.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    CarNamesDuplicatedError,
    TotalRoundEmptyError,
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
    MoveStrategiesNotArrayError,
    MoveStrategiesElementNotMoveStrategyError,
    MovesStrategiesLengthError,
} from './errors.js';
import MoveStrategy from '../entities/MoveStrategy/MoveStrategy.js';

const hasDuplicate = (input) => new Set(input).size !== input.length;

const CAR_NAMES_SEPERATOR = ',';
export const validateCarNames = (carNames) => {
    if (!isString(carNames)) throw new CarNamesNotStringError();
    if (isEmptyString(carNames)) throw new CarNamesEmptyStringError();
    const parsedCarNames = parseAndTrim(carNames, CAR_NAMES_SEPERATOR);
    if (hasDuplicate(parsedCarNames)) throw new CarNamesDuplicatedError();
};

const ROUNDS_MIN = 1;
const ROUNDS_MAX = 10;
const isOutOfBoundary = (input) => {
    return input < ROUNDS_MIN || input > ROUNDS_MAX;
};

export const validateTotalRound = (totalRound) => {
    if (isEmptyValue(totalRound)) throw new TotalRoundEmptyError();
    const converted = Number(totalRound);
    if (Number.isNaN(converted)) throw new TotalRoundNotNumberError();
    if (!Number.isInteger(converted)) throw new TotalRoundNotIntegerError();
    if (isOutOfBoundary(converted)) throw new TotalRoundOutOfRangeError();
};

const hasNonMoveStrategyElement = (moveStrategies) =>
    moveStrategies.some((strategy) => !(strategy instanceof MoveStrategy));

export const validateMoveStrategies = (moveStrategies, carsCount) => {
    if (!Array.isArray(moveStrategies)) throw new MoveStrategiesNotArrayError();
    if (hasNonMoveStrategyElement(moveStrategies))
        throw new MoveStrategiesElementNotMoveStrategyError();
    if (!hasSameLength(moveStrategies, carsCount))
        throw new MovesStrategiesLengthError();
};
