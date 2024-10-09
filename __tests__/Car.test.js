import Car from '../src/Models/Car/Car.js';
import FixedNumberStrategy from './Fixture/FixedNumberStrategy.js';

describe('Car 생성자 테스트', () => {
    describe('생성자 내부 로직 테스트', () => {
        describe('이름과 위치를 상태로 하는 Car 객체를 생성합니다.', () => {
            it.each([{ position: 0 }, { position: 1 }])(
                'name: erica, position: $position',
                ({ position }) => {
                    const car = new Car('erica', position);
                    expect(car).toBeInstanceOf(Car);
                    expect(car.getName()).toBe('erica');
                    expect(car.getPosition()).toBe(position);
                },
            );
        });
    });
});

describe('of() 테스트', () => {
    it('position을 인자로 전달하지 않으면, position을 0으로 설정합니다.', () => {
        const car = Car.of('erica');
        expect(car.getName()).toBe('erica');
        expect(car.getPosition()).toBe(0);
    });

    it('Car 인스턴스를 반환합니다.', () => {
        expect(Car.of('erica', 0)).toBeInstanceOf(Car);
    });
});

describe('전진 동작 테스트', () => {
    describe('(전진 조건: 숫자 >= 4) 테스트', () => {
        const movableCondition = (num) => num >= 4;
        describe('4 이상이면 현재 위치에서 1만큼 전진합니다.', () => {
            it.each([4, 9])('%p', (number) => {
                const car = Car.of('erica', 0);
                car.tryMove(new FixedNumberStrategy(movableCondition, number));
                expect(car.getPosition()).toBe(1);
            });
        });

        describe('4 미만이면 현재 위치를 유지합니다.', () => {
            it.each([0, 3])('%p', (number) => {
                const car = Car.of('erica', 0);
                car.tryMove(new FixedNumberStrategy(movableCondition, number));
                expect(car.getPosition()).toBe(0);
            });
        });
    });

    describe('(전진 조건: 숫자 >= 5) 전진 조건 변경 테스트', () => {
        const movableCondition = (num) => num >= 5;
        describe('5 이상이면 현재 위치에서 1만큼 전진합니다.', () => {
            it.each([5, 9])('%p', (number) => {
                const car = Car.of('erica', 0);
                const strategy = new FixedNumberStrategy(
                    movableCondition,
                    number,
                );
                strategy.setMovableCondition((number) => number >= 5);
                car.tryMove(strategy);
                expect(car.getPosition()).toBe(1);
            });
        });

        describe('5 미만이면 현재 위치를 유지합니다.', () => {
            it.each([0, 3, 4])('%p', (number) => {
                const car = Car.of('erica', 0);
                const strategy = new FixedNumberStrategy(
                    movableCondition,
                    number,
                );
                strategy.setMovableCondition((number) => number >= 5);
                car.tryMove(strategy);
                expect(car.getPosition()).toBe(0);
            });
        });
    });
});

describe('Car 정보 반환 테스트', () => {
    const car = Car.of('erica', 0);

    it('getName()은 Car 이름을 반환한다.', () => {
        expect(car.getName()).toBe('erica');
    });
    it('getPosition()은 Car 현재 위치를 반환한다.', () => {
        expect(car.getPosition()).toBe(0);
    });
});
