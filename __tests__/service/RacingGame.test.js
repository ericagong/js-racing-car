import {
    createCars,
    playWith,
    getRoundSnapshots,
    getWinnerCarNames,
} from '../../src/Models/service/RacingGame.js';
import MoveStrategy from '../../src/Models/entities/MoveStrategy/MoveStrategy.js';
import Car from '../../src/Models/entities/Car/Car.js';
import Round from '../../src/Models/entities/Round/Round.js';

describe('createCars(carNames) 테스트', () => {
    describe('자동차 이름 배열을 받아 Car 객체 배열을 반환한다.', () => {
        it.each([
            { carNames: ['erica'], expected: [Car.of('erica')] },
            {
                carNames: ['erica', 'Erica'],
                expected: [Car.of('erica'), Car.of('Erica')],
            },
            {
                carNames: ['erica', 'Erica', 'ryang'],
                expected: [Car.of('erica'), Car.of('Erica'), Car.of('ryang')],
            },
        ])(`carNames: $carNames`, ({ carNames, expected }) => {
            expect(createCars(carNames)).toEqual(expected);
        });
    });
});

describe('playWith(cars, totalRound, moveStrategies) 테스트', () => {
    describe('totalRounds와 같은 길이의 Round 배열을 반환한다.', () => {
        const cars = [
            Car.of('erica'),
            Car.of('Erica'),
            Car.of('ryang'),
            Car.of('yang'),
            Car.of('theon'),
        ];
        const moveStrategies = Array.from(
            { length: cars.length },
            () =>
                new MoveStrategy(
                    () => true,
                    () => {},
                    1,
                ),
        );
        it.each([1, 5, 10])('totalRound: $totalRound', (totalRound) => {
            const rounds = playWith(cars, totalRound, moveStrategies);
            expect(rounds).toHaveLength(totalRound);
        });
    });
});

describe('getRoundSnapshots(rounds) 테스트', () => {
    describe('길이가 rounds와 동일한 round.snapshot 배열을 반환한다.', () => {
        it.each([
            { round: [Round.of(1)], expected: [Round.of(1).snapshot] },
            {
                round: [Round.of(1), Round.of(2)],
                expected: [Round.of(1).snapshot, Round.of(2).snapshot],
            },
            {
                round: [Round.of(1), Round.of(2), Round.of(3)],
                expected: [
                    Round.of(1).snapshot,
                    Round.of(2).snapshot,
                    Round.of(3).snapshot,
                ],
            },
        ])(`round: $round`, ({ round, expected }) => {
            expect(getRoundSnapshots(round)).toEqual(expected);
        });
    });
});

describe('getWinnerCarNames(cars) 테스트', () => {
    describe('Car 배열 중 가장 position이 큰 Car들의 이름 배열을 반환한다.', () => {
        it.each([
            {
                cars: [
                    Car.of('erica', 1),
                    Car.of('Erica', 0),
                    Car.of('ryang', 0),
                ],
                expected: ['erica'],
            },
            {
                cars: [
                    Car.of('erica', 1),
                    Car.of('Erica', 1),
                    Car.of('ryang', 0),
                ],
                expected: ['erica', 'Erica'],
            },
            {
                cars: [
                    Car.of('erica', 1),
                    Car.of('Erica', 1),
                    Car.of('ryang', 1),
                ],
                expected: ['erica', 'Erica', 'ryang'],
            },
        ])(`cars: $cars`, ({ cars, expected }) => {
            expect(getWinnerCarNames(cars)).toEqual(expected);
        });
    });
});
