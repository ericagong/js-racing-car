import Cars from '../../src/Domain/Cars/Cars.js';
import Car from '../../src/Domain/Car/Car.js';
import { CarNamesDuplicatedError } from '../../src/Domain/Cars/errors.js';

const alwaysMove = () => true;
const neverMove = () => false;

describe('Cars.of(names) 테스트', () => {
    describe('유효한 이름 배열로 Cars 인스턴스를 생성한다.', () => {
        it.each([
            { names: ['erica'] },
            { names: ['erica', 'ryang'] },
            { names: ['erica', 'ryang', 'yang'] },
        ])('names: $names', ({ names }) => {
            expect(() => Cars.of(names)).not.toThrow();
        });
    });

    describe('중복된 이름이 존재하면 에러가 발생한다.', () => {
        it.each([
            { names: ['erica', 'erica'] },
            { names: ['gong0', 'gong0', 'Gong'] },
            { names: ['1031', '1031'] },
        ])('names: $names', ({ names }) => {
            expect(() => Cars.of(names)).toThrow(CarNamesDuplicatedError);
        });
    });
});

describe('moveAll(moveStrategy) 테스트', () => {
    it('항상 이동 전략 적용 시 모든 자동차가 이동한다.', () => {
        const cars = Cars.of(['erica', 'ryang', 'yang']);

        cars.moveAll(alwaysMove);

        expect(cars.snapshot).toEqual([
            { name: 'erica', position: 1 },
            { name: 'ryang', position: 1 },
            { name: 'yang', position: 1 },
        ]);
    });

    it('항상 정지 전략 적용 시 모든 자동차가 이동하지 않는다.', () => {
        const cars = Cars.of(['erica', 'ryang', 'yang']);

        cars.moveAll(neverMove);

        expect(cars.snapshot).toEqual([
            { name: 'erica', position: 0 },
            { name: 'ryang', position: 0 },
            { name: 'yang', position: 0 },
        ]);
    });
});

describe('getWinnerNames() 테스트', () => {
    describe('우승자가 한 대인 경우', () => {
        it('가장 맨 앞에 있는 자동차의 이름을 반환한다.', () => {
            const cars = Cars.from([
                Car.of('erica', 3),
                Car.of('ryang', 1),
                Car.of('yang', 0),
            ]);

            expect(cars.getWinnerNames()).toEqual(['erica']);
        });
    });

    describe('우승자가 여러 대인 경우', () => {
        it.each([
            {
                desc: '2대가 동일한 최대 position',
                cars: Cars.from([
                    Car.of('erica', 3),
                    Car.of('ryang', 3),
                    Car.of('yang', 1),
                ]),
                expected: ['erica', 'ryang'],
            },
            {
                desc: '모든 자동차가 같은 position',
                cars: Cars.from([
                    Car.of('erica', 0),
                    Car.of('ryang', 0),
                    Car.of('yang', 0),
                ]),
                expected: ['erica', 'ryang', 'yang'],
            },
        ])('$desc', ({ cars, expected }) => {
            expect(cars.getWinnerNames()).toEqual(expected);
        });
    });
});

describe('snapshot 테스트', () => {
    it.each([
        {
            desc: '자동차 1대',
            cars: Cars.from([Car.of('erica', 2)]),
            expected: [{ name: 'erica', position: 2 }],
        },
        {
            desc: '자동차 2대',
            cars: Cars.from([Car.of('erica', 3), Car.of('ryang', 1)]),
            expected: [
                { name: 'erica', position: 3 },
                { name: 'ryang', position: 1 },
            ],
        },
        {
            desc: '자동차 3대',
            cars: Cars.from([
                Car.of('erica', 3),
                Car.of('ryang', 1),
                Car.of('yang', 0),
            ]),
            expected: [
                { name: 'erica', position: 3 },
                { name: 'ryang', position: 1 },
                { name: 'yang', position: 0 },
            ],
        },
    ])('$desc', ({ cars, expected }) => {
        expect(cars.snapshot).toEqual(expected);
    });
});
