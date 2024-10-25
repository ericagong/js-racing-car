import Car from '../../src/Models/entities/Car/Car.js';
import MoveStrategy from '../../src/Models/entities/MoveStrategy/MoveStrategy.js';
import { TryMoveArgNotMoveStrategyError } from '../../src/Models/entities/Car/errors.js';

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

describe('new Car(name, position) 테스트', () => {
    describe('name, position을 갖는 Car 인스턴스를 반환한다.', () => {
        it.each([
            { name: 'erica', position: 0, expected: new Car('erica', 0) },
            { name: 'erica', position: 1, expected: new Car('erica', 1) },
        ])(
            'name: $name, position: $position',
            ({ name, position, expected }) => {
                expect(new Car(name, position)).toEqual(expected);
            },
        );
    });
});

describe('tryMove(moveStrategy) 테스트', () => {
    describe('moveStrategy 유효성 검사 테스트', () => {
        describe('MoveStrategy 인스턴스가 아닌 경우, 에러를 발생시킨다.', () => {
            it.each([
                1031,
                '123',
                true,
                null,
                undefined,
                {},
                [],
                function () {},
            ])('%p', (moveStrategy) => {
                const car = Car.of('erica');
                expect(() => car.tryMove(moveStrategy)).toThrow(
                    TryMoveArgNotMoveStrategyError,
                );
            });
        });

        it('MoveStrategy 인스턴스인 경우, 에러를 발생시키지 않는다.', () => {
            const car = Car.of('erica');
            const moveStrategy = MoveStrategy.from(
                () => true,
                () => {},
                1,
            );
            expect(() => car.tryMove(moveStrategy)).not.toThrow();
        });
    });

    describe('전진 테스트', () => {
        describe('moveStrategy의 전진조건에 부합하면, moveStrategy.step 만큼 전진한다.', () => {
            it.each([
                { isMovable: () => true, step: 1, expected: 1 },
                { isMovable: () => true, step: 2, expected: 2 },
                { isMovable: () => true, step: 3, expected: 3 },
            ])('%p', ({ isMovable, step, expected }) => {
                const car = Car.of('erica', 0);
                const moveStrategy = MoveStrategy.from(
                    isMovable,
                    () => {},
                    step,
                );
                car.tryMove(moveStrategy);
                expect(car.position).toBe(expected);
            });
        });

        describe('moveStrategy의 전진조건에 부합하지 않으면, 전진하지 않는다.', () => {
            it.each([
                { isMovable: () => false, initialPosition: 0, expected: 0 },
                { isMovable: () => false, initialPosition: 1, expected: 1 },
                { isMovable: () => false, initialPosition: 2, expected: 2 },
            ])('%p', ({ isMovable, initialPosition, expected }) => {
                const car = Car.of('erica', initialPosition);
                const moveStrategy = MoveStrategy.from(isMovable, () => {}, 1);
                car.tryMove(moveStrategy);
                expect(car.position).toBe(expected);
            });
        });
    });
});

describe('get position 테스트', () => {
    describe('position을 반환한다.', () => {
        it.each([
            { name: 'erica', position: 0, expected: 0 },
            { name: 'erica', position: 1, expected: 1 },
            { name: 'erica', position: 2, expected: 2 },
        ])('%p', ({ name, position, expected }) => {
            const car = Car.of(name, position);
            expect(car.position).toBe(expected);
        });
    });
});

describe('get name 테스트', () => {
    describe('name.value를 반환한다.', () => {
        it.each(['erica', 'Erica', 'ryang', 'yang', 'gong'])(
            'carName: %p',
            (carName) => {
                const car = Car.of(carName);
                expect(car.name).toBe(carName);
            },
        );
    });
});
