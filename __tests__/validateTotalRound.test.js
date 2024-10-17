import {
    TotalRoundEmptyError,
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
} from '../src/Models/RacingGame/errors.js';
import validateTotalRound from '../src/Models/RacingGame/validateTotalRound.js';

describe('validateTotalRound() 테스트', () => {
    describe('유효하지 않은 값을 입력한 경우', () => {
        describe('RoundCount가 빈 값이면, 에러가 발생시킨다.', () => {
            it.each(['', null, undefined, ' '])(
                '시도 횟수가 빈 값인 경우, 에러를 발생시킨다.',
                (totalRound) => {
                    expect(() => validateTotalRound(totalRound)).toThrow(
                        TotalRoundEmptyError,
                    );
                },
            );
        });

        describe('RoundCount가 숫자 형태가 아니면, 에러를 발생시킨다.', () => {
            it.each(['12@', '123456*', '12ab', 'abcde', '-12a'])(
                '%p',
                (totalRound) => {
                    expect(() => validateTotalRound(totalRound)).toThrow(
                        TotalRoundNotNumberError,
                    );
                },
            );
        });

        describe('RoundCount가 정수 형태가 아니면, 에러를 발생시킨다.', () => {
            it.each([1.5, 0.5, 1.03])('%p', (totalRound) => {
                expect(() => validateTotalRound(totalRound)).toThrow(
                    TotalRoundNotIntegerError,
                );
            });
        });

        describe('RoundCount가 1회 이상 10회 이하가 아니면, 에러를 발생시킨다.', () => {
            it.each([-10, -1, 0])('%p', (totalRound) => {
                expect(() => validateTotalRound(totalRound)).toThrow(
                    TotalRoundOutOfRangeError,
                );
            });
        });
    });

    describe('RoundCount로 1과 10 사이 정수 숫자 형태의 문자열 값을 입력하면, 에러를 발생시키지 않는다.', () => {
        it.each([1, 2, 3, 8, 9, 10])('totalRound: %p', (totalRound) => {
            expect(() => validateTotalRound(totalRound)).not.toThrow();
        });
    });

    describe('RoundCount로 1과 10 사이 정수 정수 형태의 문자열 값을 입력하면, 에러를 발생시키지 않는다.', () => {
        it.each(['1', '2', '3', '8', '9', '10'])(
            'totalRound: %p',
            (totalRound) => {
                expect(() => validateTotalRound(totalRound)).not.toThrow();
            },
        );
    });
});
