import {
    CarNamesEmptyError,
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
    const { from, playOnce, getRecord } = createCars();

    const isEmpty = (value) => {
        return (
            value === null ||
            value === undefined ||
            (typeof value === 'string' && value.trim() === '')
        );
    };

    const validateCarNames = (input) => {
        if (isEmpty(input)) throw new CarNamesEmptyError();
    };

    const ROUND_MIN = 1;
    const validateRounds = (input) => {
        if (isEmpty(input)) throw new TotalRoundsEmptyError();

        const round = Number(input);
        if (Number.isNaN(round)) throw new TotalRoundsNotNumberError();
        if (!Number.isInteger(round)) throw new TotalRoundsNotIntegerError();

        if (round < ROUND_MIN) throw new TotalRoundsNotPositiveError();
    };

    const split = (userInput) => {
        return userInput.split(',').map((carName) => carName.trim());
    };

    const set = (carNamesInput, roundsInput) => {
        validateCarNames(carNamesInput);

        validateRounds(roundsInput);

        const carNames = split(carNamesInput);

        cars = from(carNames);

        totalRounds = Number(roundsInput);
    };

    const play = (moveStrategies = cars.map(() => new RandomStrategy())) => {
        while (totalRounds--) {
            playOnce(cars, moveStrategies);

            roundHistory.push(getRecord(cars));
        }
    };

    const getWinners = () => {
        const maxPosition = Math.max(
            ...cars.map((car) => car.getRecord().position),
        );

        return cars.filter((car) => car.getRecord().position === maxPosition);
    };

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
