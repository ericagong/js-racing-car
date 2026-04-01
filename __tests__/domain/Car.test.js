import Car from '../../src/domain/Car/Car.js';

describe('static of(name, position) 테스트', () => {
    describe('name, position이 유효한 경우, Car 인스턴스를 반환한다.', () => {
        it.each([
            { name: 'erica', position: 1, expected: Car.of('erica', 1) },
            { name: 'erica', position: 0, expected: Car.of('erica', 0) },
        ])('name: $name, position: $position', ({ name, position, expected }) => {
            expect(Car.of(name, position)).toEqual(expected);
        });
    });

    describe('position을 전달하지 않은 경우, position을 0으로 설정한다.', () => {
        it('position: 0', () => {
            const car = Car.of('erica');
            expect(car.position).toBe(0);
        });
    });
});

describe('tryMove(moveStrategy) 테스트', () => {
    describe('전진 조건에 부합하는 경우, 1칸 전진한다.', () => {
        it.each([
            { initialPosition: 0, expected: 1 },
            { initialPosition: 1, expected: 2 },
            { initialPosition: 5, expected: 6 },
        ])('position: $initialPosition → $expected', ({ initialPosition, expected }) => {
            const car = Car.of('erica', initialPosition);
            car.tryMove(() => true);
            expect(car.position).toBe(expected);
        });
    });

    describe('전진 조건에 부합하지 않는 경우, 전진하지 않는다.', () => {
        it.each([
            { initialPosition: 0, expected: 0 },
            { initialPosition: 1, expected: 1 },
            { initialPosition: 2, expected: 2 },
        ])('position: $initialPosition → $expected', ({ initialPosition, expected }) => {
            const car = Car.of('erica', initialPosition);
            car.tryMove(() => false);
            expect(car.position).toBe(expected);
        });
    });
});

describe('get position 테스트', () => {
    describe('position을 반환한다.', () => {
        it.each([
            { name: 'erica', position: 0, expected: 0 },
            { name: 'erica', position: 1, expected: 1 },
            { name: 'erica', position: 2, expected: 2 },
        ])('position: $position', ({ name, position, expected }) => {
            const car = Car.of(name, position);
            expect(car.position).toBe(expected);
        });
    });
});

describe('get name 테스트', () => {
    describe('name을 반환한다.', () => {
        it.each(['erica', 'Erica', 'ryang', 'yang', 'gong'])(
            'name: %p',
            (carName) => {
                const car = Car.of(carName);
                expect(car.name).toBe(carName);
            },
        );
    });
});
