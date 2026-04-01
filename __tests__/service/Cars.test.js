import Cars from '../../src/Models/service/Cars/index.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    CarNamesDuplicatedError,
} from '../../src/Models/service/Cars/errors.js';
import Car from '../../src/Models/entities/Car/Car.js';
import MoveStrategy from '../../src/Models/entities/MoveStrategy/MoveStrategy.js';

const { validateCarNames, createCars, getWinnerCarNames, moveCars } = Cars;

describe('validateCarNames(carNames) 테스트', () => {
    describe('유효하지 않은 형태의 carNames이라면, 에러가 발생한다.', () => {
        describe('carNames가 string 타입이 아닌 경우', () => {
            it.each([1031, true, null, undefined, {}, [], function () {}])(
                'carNames: %p',
                (carNames) => {
                    expect(() => validateCarNames(carNames)).toThrow(
                        CarNamesNotStringError,
                    );
                },
            );
        });

        describe('carNames가 빈 문자열인 경우', () => {
            it.each(['', ' ', '   '])('carNames: "%s"', (carNames) => {
                expect(() => validateCarNames(carNames)).toThrow(
                    CarNamesEmptyStringError,
                );
            });
        });

        describe('carNames에 중복된 자동차 이름이 존재하는 경우', () => {
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
    });

    describe('유효한 값을 입력한 경우, 에러가 발생하지 않는다.', () => {
        describe('carNames에 하나의 자동차 이름만 입력한 경우', () => {
            it.each(['e', 'er', 'eri', 'eric', 'erica', '  _', '!!! '])(
                '%p',
                (carNames) => {
                    expect(() => validateCarNames(carNames)).not.toThrow();
                },
            );
        });

        describe('carNames에 여러 개의 자동차 이름을 중복없이 입력한 경우', () => {
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

describe('createCars(carNames) 테스트', () => {
    describe('carNames에 주어진 자동차 이름들을 가진 Car 인스턴스 배열을 반환한다.', () => {
        it.each([
            { carNames: ['erica'], expected: [Car.of('erica')] },
            {
                carNames: ['erica', 'ryang'],
                expected: [Car.of('erica'), Car.of('ryang')],
            },
            {
                carNames: ['erica', 'ryang', 'yang'],
                expected: [Car.of('erica'), Car.of('ryang'), Car.of('yang')],
            },
        ])(`carNames: %p`, ({ carNames, expected }) => {
            expect(createCars(carNames)).toEqual(expected);
        });
    });
});

describe('getWinnerCarNames(cars) 테스트', () => {
    describe('Car 배열 중 가장 position이 큰 Car들의 이름 배열을 반환한다.', () => {
        it.each([
            {
                cars: [
                    Car.of('erica', 1),
                    Car.of('Erica', 0),
                    Car.of('ryang', 0),
                ],
                expected: ['erica'],
            },
            {
                cars: [
                    Car.of('erica', 1),
                    Car.of('Erica', 1),
                    Car.of('ryang', 0),
                ],
                expected: ['erica', 'Erica'],
            },
            {
                cars: [
                    Car.of('erica', 1),
                    Car.of('Erica', 1),
                    Car.of('ryang', 1),
                ],
                expected: ['erica', 'Erica', 'ryang'],
            },
        ])(`cars: $cars`, ({ cars, expected }) => {
            expect(getWinnerCarNames(cars)).toEqual(expected);
        });
    });
});

describe('moveCars(cars, moveStrategy) 테스트', () => {
    describe('moveStrategy에 따라 cars 배열의 Car들을 이동시킨다.', () => {
        const cars = [
            Car.of('erica', 0),
            Car.of('Erica', 0),
            Car.of('ryang', 0),
            Car.of('yang', 0),
        ];
        it.each([
            {
                name: '항상 이동 전략 - 1칸 이동',
                moveStrategy: MoveStrategy.from(
                    () => true,
                    () => {},
                    1,
                ),
                expected: [
                    Car.of('erica', 1),
                    Car.of('Erica', 1),
                    Car.of('ryang', 1),
                    Car.of('yang', 1),
                ],
            },
            {
                name: '항상 이동 전략 - 2칸 이동',
                moveStrategy: MoveStrategy.from(
                    () => true,
                    () => {},
                    2,
                ),
                expected: [
                    Car.of('erica', 2),
                    Car.of('Erica', 2),
                    Car.of('ryang', 2),
                    Car.of('yang', 2),
                ],
            },
            {
                name: '항상 정지 전략',
                moveStrategy: MoveStrategy.from(
                    () => false,
                    () => {},
                    1,
                ),
                expected: [
                    Car.of('erica', 0),
                    Car.of('Erica', 0),
                    Car.of('ryang', 0),
                    Car.of('yang', 0),
                ],
            },
        ])('$name', ({ moveStrategy, expected }) => {
            moveCars(cars, moveStrategy);
            expect(cars).toEqual(expected);
        });
    });
});
