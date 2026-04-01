import TotalRound from '../../src/domain/TotalRound/TotalRound.js';
import {
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
} from '../../src/domain/TotalRound/errors.js';

describe('TotalRound.of(value) 테스트', () => {
    describe('유효하지 않은 값을 입력하면 에러가 발생한다.', () => {
        describe('숫자가 아닌 경우', () => {
            it.each([NaN, 'abc', true, null, undefined])(
                '%p',
                (value) => {
                    expect(() => TotalRound.of(value)).toThrow(
                        TotalRoundNotNumberError,
                    );
                },
            );
        });

        describe('정수가 아닌 경우', () => {
            it.each([1.5, 0.5, 1.03])('%p', (value) => {
                expect(() => TotalRound.of(value)).toThrow(
                    TotalRoundNotIntegerError,
                );
            });
        });

        describe('[1, 10] 범위를 벗어난 경우', () => {
            it.each([-10, -1, 0, 11, 100])('%p', (value) => {
                expect(() => TotalRound.of(value)).toThrow(
                    TotalRoundOutOfRangeError,
                );
            });
        });
    });

    describe('유효한 값을 입력하면 TotalRound 인스턴스를 반환한다.', () => {
        it.each([1, 2, 3, 5, 8, 10])('%p', (value) => {
            const totalRound = TotalRound.of(value);
            expect(totalRound.value).toBe(value);
        });
    });
});
