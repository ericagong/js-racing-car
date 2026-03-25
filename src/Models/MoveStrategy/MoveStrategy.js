import {
    MoveStrategyAbstractClassError,
    GenerateNumberNotImplementedError,
    IsMovableNotImplementedError,
    ConditionFunctionNotFunctionError,
} from './errors.js';

// TODO 추상 클래스 부분 Mixin으로 변경
export default class MoveStrategy {
    #movableCondition;

    static defaultMovableCondition = (num) => num >= 4;

    constructor() {
        if (new.target === MoveStrategy)
            throw new MoveStrategyAbstractClassError();
        this.#movableCondition = MoveStrategy.defaultMovableCondition;
    }

    #validateCondition(conditionFunc) {
        if (typeof conditionFunc !== 'function')
            throw new ConditionFunctionNotFunctionError();
    }

    getMovableCondition() {
        return this.#movableCondition;
    }

    setMovableCondition(conditionFunc) {
        this.#validateCondition(conditionFunc);
        this.#movableCondition = conditionFunc;
    }

    generateNumber() {
        throw new GenerateNumberNotImplementedError();
    }

    isMovable() {
        throw new IsMovableNotImplementedError();
    }
}
