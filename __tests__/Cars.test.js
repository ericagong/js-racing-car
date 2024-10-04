import Car from '../src/Models/Car/Car.js';
import createCars from '../src/Models/Cars/createCars.js';
import { DuplicatedCarNameError } from '../src/Models/Cars/errors.js';
import MoveStrategies from './Fixture/MoveStrategies.js';

const { from, playOnce, getRecord } = createCars();
describe('from() 테스트', () => {
    describe('CarNames 유효성 검사', () => {
        describe('중복된 자동차 이름이 존재하면, 에러를 발생시킨다.', () => {
            it.each([
                { carNames: ['erica', 'erica', ' '] },
                { carNames: ['gong0', 'gong0', 'Gong'] },
                { carNames: ['1031', '1031'] },
                { carNames: ['*****', '*****', '**!**', '***!*', '*****'] },
                { carNames: ['*e*1C', '*e*1C'] },
                { carNames: [' ', ' '] },
                { carNames: ['', ''] },
            ])('$carNames', ({ carNames }) => {
                expect(() => from(carNames)).toThrow(DuplicatedCarNameError);
            });
        });

        describe('유효한 경우, 에러 없이 Car 배열을 생성한다.', () => {
            it.each([
                { carNames: ['erica', 'Erica'] },
                { carNames: ['gong0', 'Gong0', '1031', '1031!', '*****'] },
                { carNames: ['*e*1C', '*e*1c', 'ERICA', 'Pan', 'theon'] },
                { carNames: ['!****', '*!***', '**!**', '***!*', '****!'] },
            ])('$carNames', ({ carNames }) => {
                expect(() => from(carNames)).not.toThrow();

                const cars = from(carNames);

                cars.forEach((car, idx) => {
                    expect(car).toBeInstanceOf(Car);
                    const { name, position } = car.getRecord();
                    expect(name).toEqual(carNames[idx]);
                    expect(position).toBe(0);
                });

                expect(cars).toHaveLength(carNames.length);
            });
        });
    });
});

describe('playOnce() 테스트', () => {
    const cars = from(['erica', 'Erica', 'theon', 'yang', 'ryang']);
    playOnce(cars, new MoveStrategies('12345'));

    // TODO: 테스트 코드 가독성 개선 필요
    it('Cars 배열 내 자동차들이 숫자가 4 이상이면 이동하고, 그렇지 않으면 이동하지 않는다.', () => {
        expect(cars.map((car) => car.getRecord().position)).toEqual([
            0, 0, 0, 1, 1,
        ]);
    });
});

describe('getRecord() 테스트', () => {
    describe('Cars 내 모든 Car 정보를 반환한다.', () => {
        it.each([
            {
                carNames: ['erica', 'Erica'],
                expected: [
                    { name: 'erica', position: 0 },
                    { name: 'Erica', position: 0 },
                ],
            },
            {
                carNames: ['gong0', 'Gong0', '1031', '1031!', '*****'],
                expected: [
                    { name: 'gong0', position: 0 },
                    { name: 'Gong0', position: 0 },
                    { name: '1031', position: 0 },
                    { name: '1031!', position: 0 },
                    { name: '*****', position: 0 },
                ],
            },
            {
                carNames: ['*e*1C', '*e*1c', 'ERICA', 'Pan', 'theon'],
                expected: [
                    { name: '*e*1C', position: 0 },
                    { name: '*e*1c', position: 0 },
                    { name: 'ERICA', position: 0 },
                    { name: 'Pan', position: 0 },
                    { name: 'theon', position: 0 },
                ],
            },
        ])('$carNames', ({ carNames, expected }) => {
            const cars = from(carNames);
            const roundRecord = getRecord(cars);

            expect(roundRecord).toEqual(expected);
        });
    });
});
