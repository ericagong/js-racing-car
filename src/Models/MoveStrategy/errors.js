import {
    AbstractClassInstantiationError,
    AbstractMethodNotImplementedError,
} from './AbstractClassError.js';
import RuntimeError from '../RuntimeError.js';

export class MoveStrategyInstantiationError extends AbstractClassInstantiationError {
    static MESSAGE =
        'MoveStrategy는 추상 클래스로 직접 인스턴스화 할 수 없습니다.';

    constructor() {
        super(MoveStrategyInstantiationError.MESSAGE);
    }
}

export class GenerateNumberNotImplementedError extends AbstractMethodNotImplementedError {
    static MESSAGE = 'generateNumber()가 구현되지 않았습니다.';

    constructor() {
        super(GenerateNumberNotImplementedError.MESSAGE);
    }
}

export class IsMovableNotImplementedError extends AbstractMethodNotImplementedError {
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
