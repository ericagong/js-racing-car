import Round from '../../src/Models/entities/Round/Round.js';
import {
    IndexNotNumberError,
    IndexNotIntegerError,
    IndexNotPositiveError,
    CarsNotArrayError,
    CarsEmptyArrayError,
    CarsElementNotCarError,
} from '../../src/Models/entities/Round/errors.js';
import Car from '../../src/Models/entities/Car/Car.js';

describe('static of(index) 테스트', () => {
    describe('index와 cars로 생성한 Round 인스턴스를 반환한다.', () => {
        it.each([
            {
                name: 'index: 1, cars: [Car.of("erica", 0)]',
                index: 1,
                cars: [Car.of('erica', 0)],
                expected: new Round(1, [Car.of('erica', 0)]),
            },
            {
                name: 'index: 10, cars: [Car.of("erica", 0), Car.of("Erica", 1)]',
                index: 10,
                cars: [Car.of('erica', 0), Car.of('Erica', 1)],
                expected: new Round(10, [
                    Car.of('erica', 0),
                    Car.of('Erica', 1),
                ]),
            },
        ])('$name', ({ index, cars, expected }) => {
            expect(Round.of(index, cars)).toEqual(expected);
        });
    });
});

describe('new Round(index) 테스트', () => {
    describe('index가 유효하지 않으면, 에러가 발생한다.', () => {
        describe('index가 Number 타입이 아닌 경우', () => {
            it.each([
                '123',
                'abc',
                true,
                null,
                undefined,
                {},
                [],
                function () {},
            ])('%p', (index) => {
                expect(() => new Round(index)).toThrow(IndexNotNumberError);
            });
        });

        describe('index가 정수 형태가 아닌 경우', () => {
            it.each([1.1, 0.1, 9.999])('%p', (index) => {
                expect(() => new Round(index)).toThrow(IndexNotIntegerError);
            });
        });

        describe('index가 양수가 아닌 경우', () => {
            it.each([0, -1, -10])('%p', (index) => {
                expect(() => new Round(index)).toThrow(IndexNotPositiveError);
            });
        });
    });

    describe('index가 0보다 큰 정수 형태의 Number 타입이면, 에러가 발생하지 않는다.', () => {
        it.each([1, 10, 100])('%p', (index) => {
            expect(() => new Round(index)).not.toThrow();
        });
    });

    describe('생성자 내부 로직 테스트', () => {
        describe('#index를 index로 초기화한다.', () => {
            it.each([1, 10])('%p', (index) => {
                const round = new Round(index);
                expect(round.index).toBe(index);
            });
        });

        describe('#snapshot을 빈 배열로 초기화한다.', () => {
            it.each([1, 10])('%p', (index) => {
                const round = new Round(index);
                expect(round.snapshot).toEqual([]);
            });
        });
    });
});

describe('get index 테스트', () => {
    describe('index를 반환한다.', () => {
        it.each([
            { index: 1, expected: 1 },
            { index: 10, expected: 10 },
        ])('index: $index', ({ index, expected }) => {
            const round = Round.of(index);
            expect(round.index).toBe(expected);
        });
    });
});

// [ ] question - getter와 setter 동일한 테스트 코드 반복
describe('set snapshot(cars) 테스트', () => {
    describe('cars 유효성 검사 테스트', () => {
        describe('cars가 유효하지 않은 경우, 에러가 발생한다.', () => {
            describe('cars가 Array 타입이 아닌 경우', () => {
                it.each([
                    123,
                    '123',
                    'abc',
                    true,
                    null,
                    undefined,
                    {},
                    function () {},
                ])('%p', (cars) => {
                    const round = Round.of(1);
                    expect(() => (round.snapshot = cars)).toThrow(
                        CarsNotArrayError,
                    );
                });
            });

            describe('cars가 빈 배열인 경우', () => {
                it('[]', () => {
                    const round = Round.of(1);
                    expect(() => (round.snapshot = [])).toThrow(
                        CarsEmptyArrayError,
                    );
                });
            });

            describe('cars의 원소가 Car 객체가 아닌 경우', () => {
                it.each([
                    { cars: [Car.of('erica', 1), 123] },
                    { cars: [Car.of('erica', 1), 'abc'] },
                    { cars: [Car.of('erica', 1), true] },
                    { cars: [Car.of('erica', 1), null] },
                    { cars: [Car.of('erica', 1), undefined] },
                    { cars: [Car.of('erica', 1), {}] },
                    { cars: [Car.of('erica', 1), function () {}] },
                ])('%p', ({ cars }) => {
                    const round = Round.of(1);
                    expect(() => (round.snapshot = cars)).toThrow(
                        CarsElementNotCarError,
                    );
                });
            });
        });
    });

    describe('cars를 복제하여 #snapshot으로 저장한다.', () => {
        it.each([
            {
                name: '[Car.of("erica", 0)]',
                index: 1,
                cars: [Car.of('erica', 0)],
                expected: [{ name: 'erica', position: 0 }],
            },
            {
                name: '[Car.of("erica", 1), Car.of("Erica", 2), Car.of("theon", 3), Car.of("yang", 4), Car.of("ryang", 5)]',
                index: 10,
                cars: [
                    Car.of('erica', 1),
                    Car.of('Erica', 2),
                    Car.of('theon', 3),
                    Car.of('yang', 4),
                    Car.of('ryang', 5),
                ],
                expected: [
                    { name: 'erica', position: 1 },
                    { name: 'Erica', position: 2 },
                    { name: 'theon', position: 3 },
                    { name: 'yang', position: 4 },
                    { name: 'ryang', position: 5 },
                ],
            },
        ])('$name', ({ index, cars, expected }) => {
            const round = Round.of(index);
            round.snapshot = cars;
            expect(round.snapshot).toEqual(expected);
            expect(round.snapshot).not.toBe(cars);
        });
    });
});

describe('get snapshot 테스트', () => {
    describe('snapshot을 반환한다.', () => {
        it.each([
            {
                name: '[Car.of("erica", 0)]',
                index: 1,
                cars: [Car.of('erica', 0)],
                expected: [{ name: 'erica', position: 0 }],
            },
            {
                name: '[Car.of("erica", 1), Car.of("Erica", 2), Car.of("theon", 3), Car.of("yang", 4), Car.of("ryang", 5)]',
                index: 10,
                cars: [
                    Car.of('erica', 1),
                    Car.of('Erica', 2),
                    Car.of('theon', 3),
                    Car.of('yang', 4),
                    Car.of('ryang', 5),
                ],
                expected: [
                    { name: 'erica', position: 1 },
                    { name: 'Erica', position: 2 },
                    { name: 'theon', position: 3 },
                    { name: 'yang', position: 4 },
                    { name: 'ryang', position: 5 },
                ],
            },
        ])('$name', ({ index, cars, expected }) => {
            const round = Round.of(index);
            round.snapshot = cars;
            expect(round.snapshot).toEqual(expected);
            expect(round.snapshot).not.toBe(cars);
        });
    });
});
