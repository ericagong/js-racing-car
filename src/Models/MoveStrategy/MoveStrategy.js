import { isFunction } from '../utils/utils.js';
import {
    MoveStrategyInstantiationError,
    MovableConditionNotFunctionError,
    IsMovableNotImplementedError,
} from './errors.js';

export default class MoveStrategy {
    #movableCondition;

    static #DEFAULT_MOVABLE_CONDITION = () => true;

    constructor(movableCondition = MoveStrategy.#DEFAULT_MOVABLE_CONDITION) {
        if (new.target === MoveStrategy)
            throw new MoveStrategyInstantiationError();

        this.#validateMovableCondition(movableCondition);

        this.#movableCondition = movableCondition;
    }

    #validateMovableCondition(movableCondition) {
        if (!isFunction(movableCondition))
            throw new MovableConditionNotFunctionError();
    }

    get movableCondition() {
        return this.#movableCondition;
    }

    set movableCondition(condition) {
        this.#validateMovableCondition(condition);
        this.#movableCondition = condition;
    }

    isMovable() {
        throw new IsMovableNotImplementedError();
    }
}
