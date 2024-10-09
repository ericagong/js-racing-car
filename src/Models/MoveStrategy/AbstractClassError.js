import RuntimeError from '../RuntimeError.js';

class AbstractClassError extends RuntimeError {
    #type;
    #message;

    constructor(message) {
        super(message);
        this.#type = this.constructor.name;
        this.#message = message;
    }
}

export class AbstractClassInstantiationError extends AbstractClassError {
    static MESSAGE = '추상 클래스로 직접 인스턴스화 할 수 없습니다.';

    constructor() {
        super(AbstractClassInstantiationError.MESSAGE);
    }
}

export class AbstractMethodNotImplementedError extends AbstractClassError {
    static MESSAGE = '추상 클래스의 추상 메서드가 구현되지 않았습니다.';

    constructor() {
        super(AbstractMethodNotImplementedError.MESSAGE);
    }
}
