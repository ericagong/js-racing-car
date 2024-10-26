import { isFunction, isNumber } from '../../utils/utils.js';
import {
    MovableConditionNotFunctionError,
    GenerateConditionArgsNotFunctionError,
    StepNotNumberError,
    StepNotIntegerError,
} from './errors.js';

export default class MoveStrategy {
    #movableCondition;
    #generateConditionArgs;
    #step;

    static from(movableCondition, generateConditionArgs, step) {
        return new MoveStrategy(movableCondition, generateConditionArgs, step);
    }

    static #validateCondition(movableCondition) {
        if (!isFunction(movableCondition))
            throw new MovableConditionNotFunctionError();
    }

    static #validateGenerateConditionArgs(generateConditionArgs) {
        if (!isFunction(generateConditionArgs))
            throw new GenerateConditionArgsNotFunctionError();
    }

    static #validateStep(step) {
        if (!isNumber(step)) throw new StepNotNumberError();
        if (!Number.isInteger(step)) throw new StepNotIntegerError();
    }

    constructor(movableCondition, generateConditionArgs, step) {
        MoveStrategy.#validateCondition(movableCondition);
        MoveStrategy.#validateGenerateConditionArgs(generateConditionArgs);
        MoveStrategy.#validateStep(step);

        this.#movableCondition = movableCondition;
        this.#generateConditionArgs = generateConditionArgs;
        this.#step = step;
    }

    isMovable() {
        const args = this.#generateConditionArgs();
        return this.#movableCondition(args);
    }

    get step() {
        return this.#step;
    }

    // 현재 코드에서는 MoveStrategy를 생성할 때 지정한 movableCondition, generateConditionArgs, step이 유지된다.
    // 만약, MoveStrategy의 movableCondition, generateConditionArgs, step을 외부에서 변경 가능하게 처리 하고싶다면,
    // 하단의 setter 코드를 활성화시키면 된다.

    // set movableCondition(movableCondition) {
    //     MoveStrategy.#validateCondition(movableCondition);
    //     this.#movableCondition = movableCondition;
    // }

    // set generateConditionArgs(generateConditionArgs) {
    //     MoveStrategy.#validateGenerateConditionArgs(generateConditionArgs);
    //     this.#generateConditionArgs = generateConditionArgs;
    // }

    // set step(step) {
    //     MoveStrategy.#validateStep(step);
    //     this.#step = step;
    // }
}
