import Round from '../src/Models/Round/Round.js';
import Car from '../src/Models/Car/Car.js';
import MoveStrategy from '../src/Models/MoveStrategy/MoveStrategy.js';

describe('Round 클래스 생성자 테스트', () => {
    describe('생성자 내부 로직 테스트', () => {
        describe('인덱스를 상태로 하는 Round 객체를 생성합니다.', () => {
            it.each([{ index: 1 }, { index: 10 }])(
                'index: $index',
                ({ index }) => {
                    const round = new Round(index);
                    expect(round).toBeInstanceOf(Round);
                    expect(round.index).toBe(index);
                },
            );
        });
    });
});

describe('of() 테스트', () => {
    it('Round 인스턴스를 반환합니다.', () => {
        expect(Round.of(1)).toBeInstanceOf(Round);
    });
});

describe('get index() 테스트', () => {
    it.each([{ index: 1 }, { index: 10 }])('index: $index', ({ index }) => {
        const round = Round.of(index);
        expect(round.index).toBe(index);
    });
});

describe('Round 실행 관련 테스트', () => {
    const carsBefore = [
        { name: 'erica', position: 0 },
        { name: 'Erica', position: 0 },
        { name: 'theon', position: 0 },
        { name: 'yang', position: 0 },
        { name: 'ryang', position: 0 },
    ];
    const carsAfter = [
        { name: 'erica', position: 0 },
        { name: 'Erica', position: 0 },
        { name: 'theon', position: 0 },
        { name: 'yang', position: 1 },
        { name: 'ryang', position: 1 },
    ];

    const round = Round.of(1);
    const cars = carsBefore.map(({ name, position }) => Car.of(name, position));

    const movableCondition = (num) => num >= 4;
    const step = 1;
    const strategies = [
        new MoveStrategy(movableCondition, () => 1, step),
        new MoveStrategy(movableCondition, () => 2, step),
        new MoveStrategy(movableCondition, () => 3, step),
        new MoveStrategy(movableCondition, () => 4, step),
        new MoveStrategy(movableCondition, () => 5, step),
    ];

    round.run(cars, strategies);

    describe('run() 테스트', () => {
        it('실행 결과가 스냅샷 상태로 저장된다.', () => {
            expect(round.snapshot).toEqual(carsAfter);
        });
    });

    describe('snapshot 테스트', () => {
        it('스냅샷을 반환하며, 이는 Cars 배열로 구성되어 있다.', () => {
            expect(round.snapshot).toEqual([
                { name: 'erica', position: 0 },
                { name: 'Erica', position: 0 },
                { name: 'theon', position: 0 },
                { name: 'yang', position: 1 },
                { name: 'ryang', position: 1 },
            ]);
        });
    });
});
