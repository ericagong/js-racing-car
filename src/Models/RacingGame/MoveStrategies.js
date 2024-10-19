import MoveStrategy from '../MoveStrategy/MoveStrategy.js';
import {
    MoveStrategiesNotArrayError,
    MoveStrategiesElementNotMoveStrategyError,
    MovesStrategiesLengthError,
} from './errors.js';

const hasNonMoveStrategyElement = (moveStrategies) => {
    return moveStrategies.some(
        (moveStrategy) => !(moveStrategy instanceof MoveStrategy),
    );
};

const hasSameLengthWithCarsCount = (moveStrategies, carsCount) => {
    return moveStrategies.length === carsCount;
};

export default function validateMoveStrategies(moveStrategies, carsCount) {
    if (!Array.isArray(moveStrategies)) throw new MoveStrategiesNotArrayError();
    if (hasNonMoveStrategyElement(moveStrategies))
        throw new MoveStrategiesElementNotMoveStrategyError();
    if (!hasSameLengthWithCarsCount(moveStrategies, carsCount))
        throw new MovesStrategiesLengthError();
}
