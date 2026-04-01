import TotalRound from '../../src/domain/TotalRound/TotalRound.js';
import {
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
} from '../../src/domain/TotalRound/errors.js';

describe('static of(value) 테스트', () => {
    describe('value가 유효하지 않은 경우, 에러가 발생한다.', () => {
        describe('value가 숫자가 아닌 경우', () => {
            it.each([NaN, 'abc', true, null, undefined])(
                'value: %p',
                (value) => {
                    expect(() => TotalRound.of(value)).toThrow(
                        TotalRoundNotNumberError,
                    );
                },
            );
        });

        describe('value가 정수가 아닌 경우', () => {
            it.each([1.5, 0.5, 1.03])('value: %p', (value) => {
                expect(() => TotalRound.of(value)).toThrow(
                    TotalRoundNotIntegerError,
                );
            });
        });

        describe('value가 [1, 10] 범위를 벗어난 경우', () => {
            it.each([-10, -1, 0, 11, 100])('value: %p', (value) => {
                expect(() => TotalRound.of(value)).toThrow(
                    TotalRoundOutOfRangeError,
                );
            });
        });
    });

    describe('value가 [1, 10] 사이의 정수인 경우, 에러가 발생하지 않는다.', () => {
        it.each([1, 2, 3, 5, 8, 10])('value: %p', (value) => {
            expect(() => TotalRound.of(value)).not.toThrow();
        });
    });
});

describe('get value 테스트', () => {
    describe('value를 반환한다.', () => {
        it.each([1, 5, 10])('value: %p', (value) => {
            const totalRound = TotalRound.of(value);
            expect(totalRound.value).toBe(value);
        });
    });
});
