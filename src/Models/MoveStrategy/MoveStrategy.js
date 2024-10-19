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

    // 변경 가능
    // set movableCondition(movableCondition) {
    //     MoveStrategy.#validateCondition(movableCondition);
    //     this.#movableCondition = movableCondition;
    // }

    // set generateConditionArgs(generateConditionArgs) {
    //     MoveStrategy.#validateGenerateConditionArgs(generateConditionArgs);
    //     this.#generateConditionArgs = generateConditionArgs;
    // }

    get step() {
        return this.#step;
    }

    // set step(step) {
    //     MoveStrategy.#validateStep(step);
    //     this.#step = step;
    // }

    isMovable() {
        const target = this.#generateConditionArgs();
        return this.#movableCondition(target);
    }
}
