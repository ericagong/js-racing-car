import {
    CarNamesIsEmptyError,
    TotalRoundsIsEmptyError,
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

    function isEmpty(value) {
        return (
            value === null ||
            value === undefined ||
            (typeof value === 'string' && value.trim() === '')
        );
    }

    function validateCarNames(input) {
        if (isEmpty(input)) throw new CarNamesIsEmptyError();
    }

    const ROUND_MIN = 1;
    function validateRounds(input) {
        if (isEmpty(input)) throw new TotalRoundsIsEmptyError();

        const round = Number(input);
        if (Number.isNaN(round)) throw new TotalRoundsNotNumberError();
        if (!Number.isInteger(round)) throw new TotalRoundsNotIntegerError();

        if (round < ROUND_MIN) throw new TotalRoundsNotPositiveError();
    }

    function split(userInput) {
        return userInput.split(',').map((carName) => carName.trim());
    }

    function set(carNamesInput, roundsInput) {
        validateCarNames(carNamesInput);

        validateRounds(roundsInput);

        const carNames = split(carNamesInput);

        cars = from(carNames);

        totalRounds = Number(roundsInput);
    }

    function play(moveStrategies = cars.map(() => new RandomStrategy())) {
        while (totalRounds--) {
            playOnce(cars, moveStrategies);

            roundHistory.push(getRecord(cars));
        }
    }

    function getWinners() {
        const maxPosition = Math.max(
            ...cars.map((car) => car.getRecord().position),
        );

        return cars.filter((car) => car.getRecord().position === maxPosition);
    }

    function getGameResult() {
        const winners = getWinners();
        const winnerNames = winners.map((car) => car.getRecord().name);

        return {
            roundHistory,
            winnerNames,
        };
    }

    return {
        set,
        play,
        getGameResult,
    };
}
