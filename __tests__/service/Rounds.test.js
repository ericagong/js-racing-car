import Rounds from '../../src/Models/service/Rounds/index.js';
import {
    TotalRoundEmptyError,
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
} from '../../src/Models/service/Rounds/errors.js';
import Round from '../../src/Models/entities/Round/Round.js';

const { validateTotalRound, createRounds, getRoundSnapshots } = Rounds;

describe('validateTotalRound(totalRound) 테스트', () => {
    describe('유효하지 않은 값을 입력한 경우, 에러가 발생한다.', () => {
        describe('totalRound이 빈 값인 경우', () => {
            it.each(['', null, undefined, ' '])('%p', (totalRound) => {
                expect(() => validateTotalRound(totalRound)).toThrow(
                    TotalRoundEmptyError,
                );
            });
        });

        describe('totalRound이 숫자 형태의 string이 아닌 경우', () => {
            it.each(['12@', '123456*', '12ab', 'abcde', '-12a'])(
                '%p',
                (totalRound) => {
                    expect(() => validateTotalRound(totalRound)).toThrow(
                        TotalRoundNotNumberError,
                    );
                },
            );
        });

        describe('totalRound이 정수 형태의 number가 아닌 경우.', () => {
            it.each([1.5, 0.5, 1.03])('%p', (totalRound) => {
                expect(() => validateTotalRound(totalRound)).toThrow(
                    TotalRoundNotIntegerError,
                );
            });
        });

        describe('totalRound이 [1, 10] 사이의 정수 형태 number가 아닌 경우', () => {
            it.each([-10, -1, 0])('%p', (totalRound) => {
                expect(() => validateTotalRound(totalRound)).toThrow(
                    TotalRoundOutOfRangeError,
                );
            });
        });
    });

    describe('유효한 형태의 totalRound를 입력하면, 에러가 발생하지 않는다.', () => {
        describe('totalRound가 [1, 10] 사이의 정수 형태의 number인 경우', () => {
            it.each([1, 2, 3, 8, 9, 10])('totalRound: %p', (totalRound) => {
                expect(() => validateTotalRound(totalRound)).not.toThrow();
            });
        });

        describe('totalRound가 [1, 10] 사이의 정수 형태의 string인 경우', () => {
            it.each(['1', '2', '3', '8', '9', '10'])(
                'totalRound: %p',
                (totalRound) => {
                    expect(() => validateTotalRound(totalRound)).not.toThrow();
                },
            );
        });
    });
});

describe('createRounds(totalRound) 테스트', () => {
    describe('totalRound만큼 Round 객체를 생성하여 배열로 반환한다.', () => {
        it.each([
            {
                totalRound: 1,
                expected: [Round.of(1)],
            },
            {
                totalRound: 2,
                expected: [Round.of(1), Round.of(2)],
            },
            {
                totalRound: 3,
                expected: [Round.of(1), Round.of(2), Round.of(3)],
            },
        ])('$totalRound', ({ totalRound, expected }) => {
            expect(createRounds(totalRound)).toEqual(expected);
        });
    });
});

describe('getRoundSnapshots(rounds) 테스트', () => {
    describe('각 round의 round.snapshot으로 구성된 배열을 반환한다.', () => {
        it.each([
            { round: [Round.of(1)], expected: [Round.of(1).snapshot] },
            {
                round: [Round.of(1), Round.of(2)],
                expected: [Round.of(1).snapshot, Round.of(2).snapshot],
            },
            {
                round: [Round.of(1), Round.of(2), Round.of(3)],
                expected: [
                    Round.of(1).snapshot,
                    Round.of(2).snapshot,
                    Round.of(3).snapshot,
                ],
            },
        ])(`round: $round`, ({ round, expected }) => {
            expect(getRoundSnapshots(round)).toEqual(expected);
        });
    });
});
