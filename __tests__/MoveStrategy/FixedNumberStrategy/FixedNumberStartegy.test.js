import FixedNumberStrategy from '../../Fixture/FixedNumberStrategy.js';
import { FixedNumberIsNotNumberError } from '../../Fixture/errors.js';

const defaultMovableCondition = (num) => num >= 4;

describe('생성자 테스트', () => {
    describe('number 유효성 검사 테스트', () => {
        describe('숫자가 아닌 경우, 에러를 발생시킨다.', () => {
            it.each([
                true,
                'erica',
                '123',
                null,
                undefined,
                {},
                [],
                function () {},
            ])('%p', (number) => {
                expect(
                    () =>
                        new FixedNumberStrategy(
                            defaultMovableCondition,
                            number,
                        ),
                ).toThrow(FixedNumberIsNotNumberError);
            });
        });

        describe('숫자인 경우, 에러를 발생시키지 않는다.', () => {
            it.each([-1, 0, 1, 100_000])('%p', (number) => {
                expect(
                    () =>
                        new FixedNumberStrategy(
                            defaultMovableCondition,
                            number,
                        ),
                ).not.toThrow();
            });
        });
    });
});

describe('isMovable() 테스트', () => {
    describe('movableCondition() 함수의 반환값을 반환한다.', () => {
        it.each([
            {
                number: 0,
                movableCondition: (number) => number >= 0,
                expected: true,
            },
            {
                number: 0,
                movableCondition: (number) => number > 0,
                expected: false,
            },
            {
                number: 0,
                movableCondition: (number) => number <= 0,
                expected: true,
            },
            {
                number: 0,
                movableCondition: (number) => number < 0,
                expected: false,
            },
            {
                number: 0,
                movableCondition: (number) => number === 0,
                expected: true,
            },
            {
                number: 0,
                movableCondition: (number) => number !== 0,
                expected: false,
            },
            {
                number: 0,
                movableCondition: (number) => number === 1,
                expected: false,
            },
            {
                number: 0,
                movableCondition: (number) => number !== 1,
                expected: true,
            },
        ])(
            'number: %p, movableCondition: %p, expected: %p',
            ({ number, movableCondition, expected }) => {
                const strategy = new FixedNumberStrategy(
                    defaultMovableCondition,
                    number,
                );
                strategy.setMovableCondition(movableCondition);
                expect(strategy.isMovable()).toBe(expected);
            },
        );
    });
});
