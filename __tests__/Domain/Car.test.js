import Car from '../../src/Domain/Car/Car.js';

describe('static of(name, position) 테스트', () => {
    describe('name, position을 인자로 생성한 Car 인스턴스를 반환한다.', () => {
        it.each([
            { name: 'erica', position: 1, expected: Car.of('erica', 1) },
            { name: 'erica', position: 0, expected: Car.of('erica', 0) },
        ])('%p', ({ name, position, expected }) => {
            expect(Car.of(name, position)).toEqual(expected);
        });
    });

    it('position을 인자로 전달하지 않으면, position을 0으로 설정한다.', () => {
        const car = Car.of('erica');
        expect(car.position).toBe(0);
    });
});

describe('tryMove(moveStrategy) 테스트', () => {
    describe('전진 조건에 부합하면, 1칸 전진한다.', () => {
        it.each([
            { initialPosition: 0, expected: 1 },
            { initialPosition: 1, expected: 2 },
            { initialPosition: 5, expected: 6 },
        ])('position $initialPosition → $expected', ({ initialPosition, expected }) => {
            const car = Car.of('erica', initialPosition);
            car.tryMove(() => true);
            expect(car.position).toBe(expected);
        });
    });

    describe('전진 조건에 부합하지 않으면, 전진하지 않는다.', () => {
        it.each([
            { initialPosition: 0, expected: 0 },
            { initialPosition: 1, expected: 1 },
            { initialPosition: 2, expected: 2 },
        ])('position $initialPosition → $expected', ({ initialPosition, expected }) => {
            const car = Car.of('erica', initialPosition);
            car.tryMove(() => false);
            expect(car.position).toBe(expected);
        });
    });
});

describe('get position 테스트', () => {
    it.each([
        { name: 'erica', position: 0, expected: 0 },
        { name: 'erica', position: 1, expected: 1 },
        { name: 'erica', position: 2, expected: 2 },
    ])('%p', ({ name, position, expected }) => {
        const car = Car.of(name, position);
        expect(car.position).toBe(expected);
    });
});

describe('get name 테스트', () => {
    it.each(['erica', 'Erica', 'ryang', 'yang', 'gong'])(
        'carName: %p',
        (carName) => {
            const car = Car.of(carName);
            expect(car.name).toBe(carName);
        },
    );
});
