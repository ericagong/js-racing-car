import MoveStrategy from '../src/Models/MoveStrategy/MoveStrategy.js';
import {
    MovableConditionNotFunctionError,
    GenerateConditionArgsNotFunctionError,
    StepNotNumberError,
    StepNotIntegerError,
} from '../src/Models/MoveStrategy/errors.js';

describe('MoveStrategy 생성자 테스트', () => {
    describe('movableCondition이 함수가 아니면, 에러가 발생한다.', () => {
        const generateConditionArgs = () => 0;
        const step = 1;
        it.each([1031, true, null, undefined, {}, []])(
            '%p',
            (movableCondition) => {
                expect(
                    () =>
                        new MoveStrategy(
                            movableCondition,
                            generateConditionArgs,
                            step,
                        ),
                ).toThrow(MovableConditionNotFunctionError);
            },
        );
    });

    describe('generateConditionArgs가 함수가 아니면, 에러가 발생한다.', () => {
        const movableCondition = () => true;
        const step = 1;
        it.each([1031, true, null, undefined, {}, []])(
            '%p',
            (generateConditionArgs) => {
                expect(
                    () =>
                        new MoveStrategy(
                            movableCondition,
                            generateConditionArgs,
                            step,
                        ),
                ).toThrow(GenerateConditionArgsNotFunctionError);
            },
        );
    });

    describe('step 유효성 테스트', () => {
        const movableCondition = () => true;
        const generateConditionArgs = () => 0;

        describe('step이 숫자가 아닌 경우, 에러가 발생한다.', () => {
            it.each([true, null, undefined, {}, [], () => {}])('%p', (step) => {
                expect(
                    () =>
                        new MoveStrategy(
                            movableCondition,
                            generateConditionArgs,
                            step,
                        ),
                ).toThrow(StepNotNumberError);
            });
        });

        describe('step이 정수가 아닌 경우, 에러가 발생한다.', () => {
            it.each([0.5, 1.5, -1.5])('%p', (step) => {
                expect(
                    () =>
                        new MoveStrategy(
                            movableCondition,
                            generateConditionArgs,
                            step,
                        ),
                ).toThrow(StepNotIntegerError);
            });
        });
    });

    describe('movableCondition(함수), generateConditionArgs(함수), step(정수 숫자)이  타입을 지킨 경우, 에러가 발생하지 않는다.', () => {
        const movableCondition = () => true;
        const generateConditionArgs = () => 0;
        const step = 1;
        expect(
            () =>
                new MoveStrategy(movableCondition, generateConditionArgs, step),
        ).not.toThrow();
    });
});

describe('isMovable() 테스트', () => {
    describe('움직일 수 있는 조건이면, true를 반환한다.', () => {
        const step = 1;
        it.each([
            {
                name: 'movableCondition: num >= 4, generateConditionArgs: () => 4',
                movableCondition: (num) => num >= 4,
                generateConditionArgs: () => 4,
            },
            {
                name: 'movableCondition: num >= 4, generateConditionArgs: () => 9',
                movableCondition: (num) => num >= 4,
                generateConditionArgs: () => 9,
            },
        ])(`$name`, ({ movableCondition, generateConditionArgs }) => {
            const moveStrategy = new MoveStrategy(
                movableCondition,
                generateConditionArgs,
                step,
            );
            expect(moveStrategy.isMovable()).toBe(true);
        });
    });

    describe('움직일 수 없는 조건이면, false를 반환한다.', () => {
        const step = 1;
        it.each([
            {
                name: 'movableCondition: num >= 4, generateConditionArgs: () => 0',
                movableCondition: (num) => num >= 4,
                generateConditionArgs: () => 0,
            },
            {
                name: 'movableCondition: num >= 4, generateConditionArgs: () => 3',
                movableCondition: (num) => num >= 4,
                generateConditionArgs: () => 3,
            },
        ])(`$name`, ({ movableCondition, generateConditionArgs }) => {
            const moveStrategy = new MoveStrategy(
                movableCondition,
                generateConditionArgs,
                step,
            );
            expect(moveStrategy.isMovable()).toBe(false);
        });
    });
});
