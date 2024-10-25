import MoveStrategy from '../../entities/MoveStrategy/MoveStrategy.js';
import {
    MoveStrategiesNotArrayError,
    MoveStrategiesElementNotMoveStrategyError,
    MoveStrategiesLengthError,
} from './errors.js';
import { hasSameLength } from '../../utils/utils.js';

const hasNonMoveStrategyElement = (moveStrategies) =>
    moveStrategies.some((strategy) => !(strategy instanceof MoveStrategy));

export default function validateMoveStrategies(moveStrategies, carsCount) {
    if (!Array.isArray(moveStrategies)) throw new MoveStrategiesNotArrayError();
    if (hasNonMoveStrategyElement(moveStrategies))
        throw new MoveStrategiesElementNotMoveStrategyError();
    if (!hasSameLength(moveStrategies, carsCount))
        throw new MoveStrategiesLengthError();
}
