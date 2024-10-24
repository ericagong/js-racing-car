import Car from '../entities/Car/Car.js';
import Round from '../entities/Round/Round.js';

export const createCars = (carNames) => {
    return carNames.map((carName) => Car.of(carName));
};

const createRounds = (totalRound) => {
    return Array.from({ length: totalRound }, (_, idx) => Round.of(idx + 1));
};

export const playWith = (cars, totalRound, moveStrategies) => {
    const rounds = createRounds(totalRound);
    rounds.map((round) => {
        cars = round.run(cars, moveStrategies);
    });
    return rounds;
};

export const getRoundSnapshots = (rounds) =>
    rounds.map((round) => round.snapshot);

const determineWinnerCars = (cars) => {
    const maxPosition = Math.max(...cars.map((car) => car.position));
    return cars.filter((car) => car.position === maxPosition);
};

export const getWinnerCarNames = (cars) => {
    const winnerCars = determineWinnerCars(cars);
    return winnerCars.map((car) => car.name);
};
