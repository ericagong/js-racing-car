import RandomNumberStrategy from '../../../src/Models/MoveStrategy/RandomNumberStrategy/RandomNumberStrategy.js';
import {
    MinMaxNumberNotNumberError,
    MinNumberGreaterThanMaxNumberError,
} from '../../../src/Models/MoveStrategy/errors.js';

const defaultMovableCondition = (num) => num >= 4;

describe('생성자 테스트', () => {
    describe('min, max 유효성 검사 테스트', () => {
        describe('숫자가 아닌 경우, 에러를 발생시킨다.', () => {
            it.each([
                { min: true, max: true },
                { min: 'erica', max: 'erica' },
                { min: '123', max: '123' },
                { min: null, max: null },
                { min: {}, max: {} },
                { min: [], max: [] },
                { min: function () {}, max: function () {} },
            ])('min: $min, max: $max', ({ min, max }) => {
                expect(
                    () =>
                        new RandomNumberStrategy(
                            defaultMovableCondition,
                            min,
                            max,
                        ),
                ).toThrow(MinMaxNumberNotNumberError);
            });
        });

        describe('min이 max보다 큰 경우, 에러를 발생시킨다.', () => {
            it.each([
                { min: 1, max: 0 },
                { min: 2, max: -1 },
                { min: 100, max: 99 },
            ])('min: $min, max: $max', ({ min, max }) => {
                expect(
                    () =>
                        new RandomNumberStrategy(
                            defaultMovableCondition,
                            min,
                            max,
                        ),
                ).toThrow(MinNumberGreaterThanMaxNumberError);
            });
        });

        describe('유효한 경우, 에러를 발생시키지 않는다.', () => {
            it.each([
                { min: -100, max: -99 },
                { min: -1, max: 0 },
                { min: -1, max: 1 },
                { min: 1, max: 100 },
            ])('min: $min, max: $max', ({ min, max }) => {
                expect(
                    () =>
                        new RandomNumberStrategy(
                            defaultMovableCondition,
                            min,
                            max,
                        ),
                ).not.toThrow();
            });
        });

        describe('min, max 값이 없으면, 기본값으로 0, 9가 설정된다.', () => {
            it('min: undefined, max: undefined', () => {
                expect(
                    () => new RandomNumberStrategy(defaultMovableCondition),
                ).not.toThrow();
            });
        });
    });
});

describe('isMovable() 테스트', () => {
    describe('movableCondition() 함수의 반환값을 반환한다.', () => {
        it.each([
            {
                min: 0,
                max: 0,
                movableCondition: (number) => number >= 0,
                expected: true,
            },
            {
                min: 0,
                max: 0,
                movableCondition: (number) => number > 0,
                expected: false,
            },
            {
                min: 0,
                max: 0,
                movableCondition: (number) => number <= 0,
                expected: true,
            },
            {
                min: 0,
                max: 0,
                movableCondition: (number) => number < 0,
                expected: false,
            },
            {
                min: 0,
                max: 0,
                movableCondition: (number) => number === 0,
                expected: true,
            },
            {
                min: 0,
                max: 0,
                movableCondition: (number) => number !== 0,
                expected: false,
            },
            {
                min: 0,
                max: 0,
                movableCondition: (number) => number === 1,
                expected: false,
            },
            {
                min: 0,
                max: 0,
                movableCondition: (number) => number !== 1,
                expected: true,
            },
        ])(
            'number: $min, movableCondition: $movableCondition, isMovable: $expected',
            ({ min, max, movableCondition, expected }) => {
                const strategy = new RandomNumberStrategy(
                    defaultMovableCondition,
                    min,
                    max,
                );
                strategy.setMovableCondition(movableCondition);
                expect(strategy.isMovable()).toBe(expected);
            },
        );
    });
});
