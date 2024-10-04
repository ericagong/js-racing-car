import { isEmpty } from '../utils/utils.js';
import {
    TotalRoundsEmptyError,
    TotalRoundsNotNumberError,
    TotalRoundsNotIntegerError,
    TotalRoundsNotPositiveError,
} from './errors.js';
import createCars from '../Cars/createCars.js';
import RandomStrategy from '../MoveStrategy/RandomStrategy/RandomStrategy.js';

export default function createGame() {
    const roundHistory = [];
    let cars = [];
    let totalRounds = 0;

    const ROUND_MIN = 1;
    const validateRounds = (input) => {
        if (isEmpty(input)) throw new TotalRoundsEmptyError();

        const round = Number(input);
        if (Number.isNaN(round)) throw new TotalRoundsNotNumberError();
        if (!Number.isInteger(round)) throw new TotalRoundsNotIntegerError();

        if (round < ROUND_MIN) throw new TotalRoundsNotPositiveError();
    };

    // 준비
    const set = (carNames, roundsInput) => {
        cars = createCars(carNames);

        validateRounds(roundsInput);

        totalRounds = Number(roundsInput);
    };

    // 게임 반복
    const play = (moveStrategies = cars.map(() => new RandomStrategy())) => {
        while (totalRounds--) {
            cars.forEach((car, idx) => {
                car.tryMove(moveStrategies[idx]);
            });

            roundHistory.push(cars.map((car) => car.getRecord()));
        }
    };

    // 최종 우승자 추출
    const getWinners = () => {
        const maxPosition = Math.max(
            ...cars.map((car) => car.getRecord().position),
        );

        return cars.filter((car) => car.getRecord().position === maxPosition);
    };

    // 최종 결과 추출
    const getResult = () => {
        const winners = getWinners();
        const winnerNames = winners.map((car) => car.getRecord().name);

        return {
            roundHistory,
            winnerNames,
        };
    };

    return {
        set,
        play,
        getResult,
    };
}
