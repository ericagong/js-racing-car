import {
    MoveStrategyInstantiationError,
    MovableConditionNotFunctionError,
    // GenerateNumberNotImplementedError,
    IsMovableNotImplementedError,
} from './errors.js';

// TODO 추상 클래스 부분 Mixin으로 변경
export default class MoveStrategy {
    #movableCondition;

    static defaultMovableCondition = () => true;

    constructor(movableCondition = MoveStrategy.defaultMovableCondition) {
        if (new.target === MoveStrategy)
            throw new MoveStrategyInstantiationError();
        this.#validateMovableCondition(movableCondition);
        this.#movableCondition = movableCondition;
    }

    #isFunction(target) {
        return typeof target === 'function';
    }

    #validateMovableCondition(movableCondition) {
        if (!this.#isFunction(movableCondition))
            throw new MovableConditionNotFunctionError();
    }

    getMovableCondition() {
        return this.#movableCondition;
    }

    setMovableCondition(movableCondition) {
        this.#validateMovableCondition(movableCondition);
        this.#movableCondition = movableCondition;
    }

    // generateNumber() {
    //     throw new GenerateNumberNotImplementedError();
    // }

    isMovable() {
        throw new IsMovableNotImplementedError();
    }
}
