import Car from '../src/Models/Car/Car.js';
import MoveStrategy from '../src/Models/MoveStrategy/MoveStrategy.js';

describe('Car 생성자 테스트', () => {
    describe('생성자 내부 로직 테스트', () => {
        describe('이름과 위치를 상태로 하는 Car 객체를 생성합니다.', () => {
            it.each([{ position: 0 }, { position: 1 }])(
                'name: erica, position: $position',
                ({ position }) => {
                    const car = new Car('erica', position);
                    expect(car).toBeInstanceOf(Car);
                    expect(car.name).toBe('erica');
                    expect(car.position).toBe(position);
                },
            );
        });
    });
});

describe('of() 테스트', () => {
    it('position을 인자로 전달하지 않으면, position을 0으로 설정합니다.', () => {
        const car = Car.of('erica');
        expect(car.name).toBe('erica');
        expect(car.position).toBe(0);
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
                const generateFixedNumber = () => number;
                const step = 1;
                const moveStrategy = new MoveStrategy(
                    movableCondition,
                    generateFixedNumber,
                    step,
                );

                const car = Car.of('erica', 0);
                car.tryMove(moveStrategy);
                expect(car.position).toBe(1);
            });
        });

        describe('4 미만이면 현재 위치를 유지합니다.', () => {
            it.each([0, 3])('%p', (number) => {
                const generateFixedNumber = () => number;
                const step = 1;
                const moveStrategy = new MoveStrategy(
                    movableCondition,
                    generateFixedNumber,
                    step,
                );
                const car = Car.of('erica', 0);
                car.tryMove(moveStrategy);
                expect(car.position).toBe(0);
            });
        });
    });
});

describe('Car 정보 반환 테스트', () => {
    const car = Car.of('erica', 0);

    it('get name()은 Car 이름을 반환한다.', () => {
        expect(car.name).toBe('erica');
    });
    it('get position()은 Car 현재 위치를 반환한다.', () => {
        expect(car.position).toBe(0);
    });
});
