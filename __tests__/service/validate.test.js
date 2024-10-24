import {
    validateCarNames,
    validateTotalRound,
    validateMoveStrategies,
} from '../../src/Models/service/validation.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    CarNamesDuplicatedError,
    TotalRoundEmptyError,
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
    MoveStrategiesNotArrayError,
    MoveStrategiesElementNotMoveStrategyError,
    MovesStrategiesLengthError,
} from '../../src/Models/service/errors.js';
import MoveStrategy from '../../src/Models/entities/MoveStrategy/MoveStrategy.js';

describe('validateCarNames(input) 테스트', () => {
    describe('유효하지 않은 형태의 input이라면, 에러가 발생한다.', () => {
        describe('input이 string 타입이 아닌 경우', () => {
            it.each([1031, true, null, undefined, {}, [], function () {}])(
                'input: %p',
                (input) => {
                    expect(() => validateCarNames(input)).toThrow(
                        CarNamesNotStringError,
                    );
                },
            );
        });

        describe('input이 빈 문자열인 경우', () => {
            it.each(['', ' ', '   '])('input: "%s"', (input) => {
                expect(() => validateCarNames(input)).toThrow(
                    CarNamesEmptyStringError,
                );
            });
        });

        describe('input에 중복된 자동차 이름이 존재하는 경우', () => {
            it.each([
                { input: 'erica,erica, ' },
                { input: 'gong0,gong0,Gong' },
                { input: '1031,1031' },
                { input: '*****,*****,**!**,***!*,*****' },
                { input: '*e*1C,*e*1C' },
                { input: ' , ' },
                { input: ',' },
            ])('$input', ({ input }) => {
                expect(() => validateCarNames(input)).toThrow(
                    CarNamesDuplicatedError,
                );
            });
        });
    });

    describe('유효한 값을 입력한 경우, 에러가 발생하지 않는다.', () => {
        describe('input에 하나의 자동차 이름만 입력한 경우', () => {
            it.each(['e', 'er', 'eri', 'eric', 'erica', '  _', '!!! '])(
                '%p',
                (input) => {
                    expect(() => validateCarNames(input)).not.toThrow();
                },
            );
        });

        describe('input에 여러 개의 자동차 이름을 중복없이 입력한 경우', () => {
            it.each([
                'car1, car2, car3',
                '12345, aBcDe, !*_',
                'test1, Test2, tEsT1, test2, TeSt1',
                '*e*1C, *e*1c, ERICA, Pan, theon',
                '!****, *!***, **!**, ***!*, ****!',
            ])('%p', (input) => {
                expect(() => validateCarNames(input)).not.toThrow();
            });
        });
    });
});
describe('validateTotalRound(input) 테스트', () => {
    describe('유효하지 않은 값을 입력한 경우, 에러가 발생한다.', () => {
        describe('input이 빈 값인 경우', () => {
            it.each(['', null, undefined, ' '])('%p', (input) => {
                expect(() => validateTotalRound(input)).toThrow(
                    TotalRoundEmptyError,
                );
            });
        });

        describe('input이 숫자 형태의 string이 아닌 경우', () => {
            it.each(['12@', '123456*', '12ab', 'abcde', '-12a'])(
                '%p',
                (input) => {
                    expect(() => validateTotalRound(input)).toThrow(
                        TotalRoundNotNumberError,
                    );
                },
            );
        });

        describe('input이 정수 형태의 number가 아닌 경우.', () => {
            it.each([1.5, 0.5, 1.03])('%p', (input) => {
                expect(() => validateTotalRound(input)).toThrow(
                    TotalRoundNotIntegerError,
                );
            });
        });

        describe('input이 [1, 10] 사이의 정수 형태 number가 아닌 경우', () => {
            it.each([-10, -1, 0])('%p', (input) => {
                expect(() => validateTotalRound(input)).toThrow(
                    TotalRoundOutOfRangeError,
                );
            });
        });
    });

    describe('유효한 형태의 input를 입력하면, 에러가 발생하지 않는다.', () => {
        describe('input가 [1, 10] 사이의 정수 형태의 number인 경우', () => {
            it.each([1, 2, 3, 8, 9, 10])('totalRound: %p', (totalRound) => {
                expect(() => validateTotalRound(totalRound)).not.toThrow();
            });
        });

        describe('input가 [1, 10] 사이의 정수 형태의 string인 경우', () => {
            it.each(['1', '2', '3', '8', '9', '10'])(
                'totalRound: %p',
                (totalRound) => {
                    expect(() => validateTotalRound(totalRound)).not.toThrow();
                },
            );
        });
    });
});

describe('validateMoveStrategies(moveStrategies, carsCount) 유효성 검증 테스트', () => {
    const anyMoveStrategy = new MoveStrategy(
        () => true,
        () => 5,
        1,
    );

    describe('유효하지 않은 경우, 에러가 발생한다.', () => {
        describe('moveStrategies가 배열이 아닌 경우', () => {
            it.each([1031, true, null, undefined, {}, function () {}])(
                '%p',
                (moveStrategies) => {
                    expect(() =>
                        validateMoveStrategies(moveStrategies, 1),
                    ).toThrow(MoveStrategiesNotArrayError);
                },
            );
        });

        describe('moveStrategies의 요소 중 MoveStrategy가 아닌 요소가 존재하는 경우', () => {
            it.each([
                {
                    moveStrategies: [1031],
                },
                { moveStrategies: [true] },
                { moveStrategies: [null] },
                { moveStrategies: [undefined] },
                { moveStrategies: [{}] },
                { moveStrategies: [function () {}] },
            ])('%p', ({ moveStrategies }) => {
                expect(() => validateMoveStrategies(moveStrategies, 3)).toThrow(
                    MoveStrategiesElementNotMoveStrategyError,
                );
            });
        });

        describe('moveStrategies 길이와 carNames 길이가 같지 않은 경우', () => {
            it('moveStrategies 길이 < carNames 길이', () => {
                const carNames = ['erica', 'ryang', 'yang'];
                const moveStrategies = [anyMoveStrategy, anyMoveStrategy];
                expect(() => validateMoveStrategies(moveStrategies, 3)).toThrow(
                    MovesStrategiesLengthError,
                );
            });

            it('moveStrategies 길이 > carNames 길이', () => {
                const moveStrategies = [
                    anyMoveStrategy,
                    anyMoveStrategy,
                    anyMoveStrategy,
                    anyMoveStrategy,
                ];
                expect(() => validateMoveStrategies(moveStrategies, 3)).toThrow(
                    MovesStrategiesLengthError,
                );
            });
        });
    });

    describe('유효한 경우, 에러가 발생하지 않는다.', () => {
        it('moveStrategies가 carsCount 길이의 MoveStrategy로 요소가 구성된 array 타입인 경우', () => {
            const moveStrategies = [
                anyMoveStrategy,
                anyMoveStrategy,
                anyMoveStrategy,
            ];
            expect(() =>
                validateMoveStrategies(moveStrategies, 3),
            ).not.toThrow();
        });
    });
});
