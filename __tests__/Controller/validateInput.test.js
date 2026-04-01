import {
    validateCarNamesInput,
    validateTotalRoundInput,
} from '../../src/Controller/validateInput.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    TotalRoundEmptyError,
    TotalRoundNotNumberError,
    TotalRoundNotIntegerError,
    TotalRoundOutOfRangeError,
} from '../../src/Controller/errors.js';

describe('validateCarNamesInput(carNamesInput) 테스트', () => {
    describe('유효하지 않은 형태의 carNamesInput이라면, 에러가 발생한다.', () => {
        describe('carNamesInput이 string 타입이 아닌 경우', () => {
            it.each([1031, true, null, undefined, {}, [], function () {}])(
                'carNamesInput: %p',
                (carNamesInput) => {
                    expect(() => validateCarNamesInput(carNamesInput)).toThrow(
                        CarNamesNotStringError,
                    );
                },
            );
        });

        describe('carNamesInput이 빈 문자열인 경우', () => {
            it.each(['', ' ', '   '])(
                'carNamesInput: "%s"',
                (carNamesInput) => {
                    expect(() => validateCarNamesInput(carNamesInput)).toThrow(
                        CarNamesEmptyStringError,
                    );
                },
            );
        });
    });

    describe('유효한 값을 입력한 경우, 에러가 발생하지 않는다.', () => {
        it.each([
            'e',
            'erica',
            'car1, car2, car3',
            '12345, aBcDe, !*_',
        ])('%p', (carNamesInput) => {
            expect(() => validateCarNamesInput(carNamesInput)).not.toThrow();
        });
    });
});

describe('validateTotalRoundInput(totalRoundInput) 테스트', () => {
    describe('유효하지 않은 값을 입력한 경우, 에러가 발생한다.', () => {
        describe('totalRoundInput이 빈 값인 경우', () => {
            it.each(['', null, undefined, ' '])('%p', (totalRoundInput) => {
                expect(() =>
                    validateTotalRoundInput(totalRoundInput),
                ).toThrow(TotalRoundEmptyError);
            });
        });

        describe('totalRoundInput이 숫자 형태의 string이 아닌 경우', () => {
            it.each(['12@', '123456*', '12ab', 'abcde', '-12a'])(
                '%p',
                (totalRoundInput) => {
                    expect(() =>
                        validateTotalRoundInput(totalRoundInput),
                    ).toThrow(TotalRoundNotNumberError);
                },
            );
        });

        describe('totalRoundInput이 정수 형태의 number가 아닌 경우', () => {
            it.each([1.5, 0.5, 1.03])('%p', (totalRoundInput) => {
                expect(() =>
                    validateTotalRoundInput(totalRoundInput),
                ).toThrow(TotalRoundNotIntegerError);
            });
        });

        describe('totalRoundInput이 [1, 10] 범위를 벗어난 경우', () => {
            it.each([-10, -1, 0])('%p', (totalRoundInput) => {
                expect(() =>
                    validateTotalRoundInput(totalRoundInput),
                ).toThrow(TotalRoundOutOfRangeError);
            });
        });
    });

    describe('유효한 값을 입력한 경우, 에러가 발생하지 않는다.', () => {
        describe('정수 형태의 number인 경우', () => {
            it.each([1, 2, 3, 8, 9, 10])('%p', (totalRoundInput) => {
                expect(() =>
                    validateTotalRoundInput(totalRoundInput),
                ).not.toThrow();
            });
        });

        describe('정수 형태의 string인 경우', () => {
            it.each(['1', '2', '3', '8', '9', '10'])(
                '%p',
                (totalRoundInput) => {
                    expect(() =>
                        validateTotalRoundInput(totalRoundInput),
                    ).not.toThrow();
                },
            );
        });
    });
});
