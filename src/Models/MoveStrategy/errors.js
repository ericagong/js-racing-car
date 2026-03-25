import AbstractClassError from './AbstractClassError.js';

export class MoveStrategyAbstractClassError extends AbstractClassError {
    static MESSAGE = 'MoveStrategy는 추상 클래스입니다.';

    constructor() {
        super(MoveStrategyAbstractClassError.MESSAGE);
    }
}

export class GenerateNumberNotImplementedError extends AbstractClassError {
    static MESSAGE = 'generateNumber()가 구현되지 않았습니다.';

    constructor() {
        super(GenerateNumberNotImplementedError.MESSAGE);
    }
}

export class IsMovableNotImplementedError extends AbstractClassError {
    static MESSAGE = 'isMovable()이 구현되지 않았습니다.';

    constructor() {
        super(IsMovableNotImplementedError.MESSAGE);
    }
}

export class ConditionFunctionNotFunctionError extends AbstractClassError {
    static MESSAGE = 'conditionFunc은 함수여야 합니다.';

    constructor() {
        super(ConditionFunctionNotFunctionError.MESSAGE);
    }
}
