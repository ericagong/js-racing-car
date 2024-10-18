import generateRandomNumber from '../src/Controller/generateRandomNumber.js';
import {
    MinMaxNumberNotNumberError,
    MinNumberGreaterThanMaxNumberError,
} from '../src/Controller/errors.js';

describe('generateNumber(min, max) 테스트', () => {
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
                expect(() => generateRandomNumber(min, max)).toThrow(
                    MinMaxNumberNotNumberError,
                );
            });
        });

        describe('min이 max보다 큰 경우, 에러를 발생시킨다.', () => {
            it.each([
                { min: 1, max: 0 },
                { min: 2, max: -1 },
                { min: 100, max: 99 },
            ])('min: $min, max: $max', ({ min, max }) => {
                expect(() => generateRandomNumber(min, max)).toThrow(
                    MinNumberGreaterThanMaxNumberError,
                );
            });
        });

        describe('유효한 경우, 에러를 발생시키지 않는다.', () => {
            it.each([
                { min: -100, max: -99 },
                { min: -1, max: 0 },
                { min: -1, max: 1 },
                { min: 1, max: 100 },
            ])('min: $min, max: $max', ({ min, max }) => {
                expect(() => generateRandomNumber(min, max)).not.toThrow();
            });
        });
    });

    describe('[min, max] 사이의 값을 반환한다.', () => {
        it.each([
            { min: -100, max: -99 },
            { min: -1, max: 0 },
            { min: -1, max: 1 },
            { min: 1, max: 100 },
        ])('min: $min, max: $max', ({ min, max }) => {
            const number = generateRandomNumber(min, max);
            expect(number).toBeGreaterThanOrEqual(min);
            expect(number).toBeLessThanOrEqual(max);
        });
    });
});
