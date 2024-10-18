import validateCarNames from '../src/Controller/validateCarNames.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    CarNamesDuplicatedError,
} from '../src/Controller/errors.js';

describe('validateCarNames() 테스트', () => {
    describe('CarNames 유효성 검사', () => {
        describe('carNames가 문자열 타입이 아닌 경우, 에러 발생', () => {
            it.each([1031, true, null, undefined, {}, [], function () {}])(
                'carNames: %p',
                (carNames) => {
                    expect(() => validateCarNames(carNames)).toThrow(
                        CarNamesNotStringError,
                    );
                },
            );
        });

        describe('carNames가 빈 문자열인 경우, 에러 발생', () => {
            it.each(['', ' ', '   '])('carNames: "%s"', (carNames) => {
                expect(() => validateCarNames(carNames)).toThrow(
                    CarNamesEmptyStringError,
                );
            });
        });

        describe('carNames에 중복된 자동차 이름이 존재하면, 에러를 발생시킨다.', () => {
            it.each([
                { carNames: 'erica,erica, ' },
                { carNames: 'gong0,gong0,Gong' },
                { carNames: '1031,1031' },
                { carNames: '*****,*****,**!**,***!*,*****' },
                { carNames: '*e*1C,*e*1C' },
                { carNames: ' , ' },
                { carNames: ',' },
            ])('$carNames', ({ carNames }) => {
                expect(() => validateCarNames(carNames)).toThrow(
                    CarNamesDuplicatedError,
                );
            });
        });

        describe('유효한 값을 입력한 경우', () => {
            describe('carNames를 하나만 입력한 경우, 에러를 발생시키지 않는다.', () => {
                it.each(['e', 'er', 'eri', 'eric', 'erica', '  _', '!!! '])(
                    '%p',
                    (carNames) => {
                        expect(() => validateCarNames(carNames)).not.toThrow();
                    },
                );
            });

            describe('중복 없이 carNames를 여러 개 입력한 경우, 에러를 발생시키지 않는다.', () => {
                it.each([
                    'car1, car2, car3',
                    '12345, aBcDe, !*_',
                    'test1, Test2, tEsT1, test2, TeSt1',
                    '*e*1C, *e*1c, ERICA, Pan, theon',
                    '!****, *!***, **!**, ***!*, ****!',
                ])('%p', (carNames) => {
                    expect(() => validateCarNames(carNames)).not.toThrow();
                });
            });
        });
    });
});
