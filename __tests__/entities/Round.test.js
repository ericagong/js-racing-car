import Round from '../../src/Models/entities/Round/Round.js';
import { IndexNotNumberError } from '../../src/Models/entities/Round/errors.js';

describe('static of(index) 테스트', () => {
    describe('index로 생성한 Round 인스턴스를 반환한다.', () => {
        it.each([
            {
                index: 1,
                expected: new Round(1),
            },
            { index: 10, expected: new Round(10) },
        ])('%p', ({ index, expected }) => {
            expect(Round.of(index)).toEqual(expected);
        });
    });
});

describe('new Round(index) 테스트', () => {
    describe('index 유효성 검사 테스트', () => {
        describe('index가 number 타입이 아닌 경우, 에러가 발생한다.', () => {
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

        describe('index가 number 타입인 경우, 에러가 발생하지 않는다.', () => {
            it.each([1, 10])('%p', (index) => {
                expect(() => new Round(index)).not.toThrow();
            });
        });
    });

    describe('생성자 내부 로직 테스트', () => {
        describe('주어진 index를 index로 저장한다.', () => {
            it.each([{ index: 1 }, { index: 10 }])('%p', ({ index }) => {
                const round = new Round(index);
                expect(round.index).toBe(index);
            });
        });

        it('snapshot을 빈 배열로 초기화한다.', () => {
            const round = new Round(1);
            expect(round.snapshot).toEqual([]);
        });
    });
});

// [ ] moveStrategy 변경 후 수정
// describe('run(cars, moveStrategies) 테스트', () => {
//     const carsBefore = [
//         { name: 'erica', position: 0 },
//         { name: 'Erica', position: 0 },
//         { name: 'theon', position: 0 },
//         { name: 'yang', position: 0 },
//         { name: 'ryang', position: 0 },
//     ];
//     const carsAfter = [
//         { name: 'erica', position: 0 },
//         { name: 'Erica', position: 0 },
//         { name: 'theon', position: 0 },
//         { name: 'yang', position: 1 },
//         { name: 'ryang', position: 1 },
//     ];
//     const round = Round.of(1);
//     const cars = carsBefore.map(({ name, position }) => Car.of(name, position));

//     const movableCondition = (num) => num >= 4;
//     const step = 1;
//     const strategies = [
//         new MoveStrategy(movableCondition, () => 1, step),
//         new MoveStrategy(movableCondition, () => 2, step),
//         new MoveStrategy(movableCondition, () => 3, step),
//         new MoveStrategy(movableCondition, () => 4, step),
//         new MoveStrategy(movableCondition, () => 5, step),
//     ];

//     round.run(cars, strategies);

//     describe('run() 테스트', () => {
//         it('실행 결과가 스냅샷 상태로 저장된다.', () => {
//             expect(round.snapshot).toEqual(carsAfter);
//         });
//     });

//     describe('snapshot 테스트', () => {
//         it('스냅샷을 반환하며, 이는 Cars 배열로 구성되어 있다.', () => {
//             expect(round.snapshot).toEqual([
//                 { name: 'erica', position: 0 },
//                 { name: 'Erica', position: 0 },
//                 { name: 'theon', position: 0 },
//                 { name: 'yang', position: 1 },
//                 { name: 'ryang', position: 1 },
//             ]);
//         });
//     });
// });

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

describe('get snapshot 테스트', () => {
    describe('snapshot을 반환한다.', () => {
        it.each([
            { index: 1, expected: [] },
            { index: 10, expected: [] },
        ])('index: $index', ({ index, expected }) => {
            const round = Round.of(index);
            expect(round.snapshot).toEqual(expected);
        });
    });
});
