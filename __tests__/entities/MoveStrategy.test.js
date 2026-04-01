import MoveStrategy from '../../src/Models/entities/MoveStrategy/MoveStrategy.js';
import {
    MovableConditionNotFunctionError,
    GenerateConditionArgsNotFunctionError,
    StepNotNumberError,
    StepNotIntegerError,
} from '../../src/Models/entities/MoveStrategy/errors.js';

describe('static from(movableCondition, generateConditionArgs, step) 테스트', () => {
    describe('movableCondition, generateConditionArgs, step을 가진 MoveStrategy 인스턴스를 반환한다.', () => {
        it.each([
            {
                name: 'movableCondition: () => true, generateConditionArgs: () => 0, step: 1',
                movableCondition: () => true,
                generateConditionArgs: () => 0,
                step: 1,
                expected: new MoveStrategy(
                    () => true,
                    () => 0,
                    1,
                ),
            },
            {
                name: 'movableCondition: () => false, generateConditionArgs: () => {}, step: 3',
                movableCondition: () => false,
                generateConditionArgs: () => {},
                step: 3,
                expected: new MoveStrategy(
                    () => false,
                    () => {},
                    3,
                ),
            },
        ])(
            '$name',
            ({ movableCondition, generateConditionArgs, step, expected }) => {
                expect(
                    MoveStrategy.from(
                        movableCondition,
                        generateConditionArgs,
                        step,
                    ),
                ).toEqual(expected);
            },
        );
    });
});

describe('new MoveStrategy(movableCondition, generateConditionArgs, step) 테스트', () => {
    describe('유효성 검사 테스트', () => {
        describe('각 인자들이 유효하지 않은 경우, 에러가 발생한다.', () => {
            describe('movableCondition이 function 타입이 아닌 경우', () => {
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

            describe('generateConditionArgs가 function 타입이 아닌 경우', () => {
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

                describe('number 타입이 아닌 경우', () => {
                    it.each([true, null, undefined, {}, [], () => {}])(
                        '%p',
                        (step) => {
                            expect(
                                () =>
                                    new MoveStrategy(
                                        movableCondition,
                                        generateConditionArgs,
                                        step,
                                    ),
                            ).toThrow(StepNotNumberError);
                        },
                    );
                });

                describe('정수 형태가 아닌 경우', () => {
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
        });

        describe('movableCondition, generateConditionArgs, step이 순서대로 function, function, number(정수형태) 타입이면, 에러가 발생하지 않는다.', () => {
            const movableCondition = () => true;
            const generateConditionArgs = () => 0;
            const step = 1;
            expect(
                () =>
                    new MoveStrategy(
                        movableCondition,
                        generateConditionArgs,
                        step,
                    ),
            ).not.toThrow();
        });
    });

    describe('내부 로직 테스트', () => {
        describe('주어진 movableCondition, generateConditionArgs, step을 인스턴스 내부에 저장한다.', () => {
            it.each([
                {
                    name: 'movableCondition: () => true, generateConditionArgs: () => 0, step: 1',
                    movableCondition: () => true,
                    generateConditionArgs: () => 0,
                    step: 1,
                    expected: new MoveStrategy(
                        () => true,
                        () => 0,
                        1,
                    ),
                },
                {
                    name: 'movableCondition: () => false, generateConditionArgs: () => {}, step: 3',
                    movableCondition: () => false,
                    generateConditionArgs: () => {},
                    step: 3,
                    expected: new MoveStrategy(
                        () => false,
                        () => {},
                        3,
                    ),
                },
            ])(
                '$name',
                ({
                    movableCondition,
                    generateConditionArgs,
                    step,
                    expected,
                }) => {
                    expect(
                        new MoveStrategy(
                            movableCondition,
                            generateConditionArgs,
                            step,
                        ),
                    ).toEqual(expected);
                },
            );
        });
    });
});

describe('isMovable() 테스트', () => {
    describe('movableCondition에 부합하면, true를 반환한다.', () => {
        const step = 1;
        it.each([
            {
                name: 'movableCondition: num >= 4, generateConditionArgs: () => 4',
                movableCondition: (num) => num >= 4,
                generateConditionArgs: () => 4,
                expected: true,
            },
            {
                name: 'movableCondition: num >= 4, generateConditionArgs: () => 9',
                movableCondition: (num) => num >= 4,
                generateConditionArgs: () => 9,
                expected: true,
            },
        ])(`$name`, ({ movableCondition, generateConditionArgs, expected }) => {
            const moveStrategy = MoveStrategy.from(
                movableCondition,
                generateConditionArgs,
                step,
            );
            expect(moveStrategy.isMovable()).toBe(expected);
        });
    });

    describe('movableCondition에 부합하지 않으면, false를 반환한다.', () => {
        const step = 1;
        it.each([
            {
                name: 'movableCondition: num >= 4, generateConditionArgs: () => 0',
                movableCondition: (num) => num >= 4,
                generateConditionArgs: () => 0,
                expected: false,
            },
            {
                name: 'movableCondition: num >= 4, generateConditionArgs: () => 3',
                movableCondition: (num) => num >= 4,
                generateConditionArgs: () => 3,
                expected: false,
            },
        ])(`$name`, ({ movableCondition, generateConditionArgs, expected }) => {
            const moveStrategy = MoveStrategy.from(
                movableCondition,
                generateConditionArgs,
                step,
            );
            expect(moveStrategy.isMovable()).toBe(expected);
        });
    });
});
