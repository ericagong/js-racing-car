import RuntimeError from '../../RuntimeError.js';

export class MoveStrategyIsAbstractClassError extends RuntimeError {
    static MESSAGE = 'MoveStrategy는 추상 클래스입니다.';

    constructor() {
        super(MoveStrategyIsAbstractClassError.MESSAGE);
    }
}

export class GenerateNumberNotImplementedError extends RuntimeError {
    static MESSAGE = 'generateNumber()가 구현되지 않았습니다.';

    constructor() {
        super(GenerateNumberNotImplementedError.MESSAGE);
    }
}

export class IsMovableNotImplementedError extends RuntimeError {
    static MESSAGE = 'isMovable()이 구현되지 않았습니다.';

    constructor() {
        super(IsMovableNotImplementedError.MESSAGE);
    }
}

export class ConditionFunctionNotFunctionError extends RuntimeError {
    static MESSAGE = 'conditionFunc은 함수여야 합니다.';

    constructor() {
        super(ConditionFunctionNotFunctionError.MESSAGE);
    }
}
