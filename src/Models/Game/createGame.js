import createCars from '../Cars/createCars.js';
import RandomStrategy from '../MoveStrategy/RandomStrategy/RandomStrategy.js';
import validateRoundCount from '../Round/validateRoundCount.js';
import Round from '../Round/Round.js';

// TODO 항상 실행 순서가 보장되어야 하는 함수들은 어떻게 처리해야할지? - set -> play -> getResult
export default function createGame() {
    let cars = [];
    let totalRounds = 0;
    let rounds = [];

    const set = (carNames, roundsInput) => {
        cars = createCars(carNames);
        validateRoundCount(roundsInput);
        totalRounds = Number(roundsInput);
    };

    const play = (moveStrategies = cars.map(() => new RandomStrategy())) => {
        Array.from({ length: totalRounds }).forEach((_, idx) => {
            const round = Round.of(idx + 1);
            cars = round.run(cars, moveStrategies);
            rounds.push(round);
        });
    };

    const getWinnerNames = () => {
        const maxPosition = Math.max(...cars.map((car) => car.getPosition()));
        return cars
            .filter((car) => car.getPosition() === maxPosition)
            .map((car) => car.getName());
    };

    const getResult = () => {
        return {
            roundHistory: rounds.map((round) => round.getSnapShot()),
            winnerNames: getWinnerNames(),
        };
    };

    return {
        set,
        play,
        getResult,
    };
}
