import createCars from '../Cars/createCars.js';
import RandomStrategy from '../MoveStrategy/RandomStrategy/RandomStrategy.js';
import validateRoundCount from '../Round/validateRoundCount.js';

export default function createGame() {
    const roundHistory = [];
    let cars = [];
    let RoundCount = 0;

    // 준비
    const set = (carNames, roundsInput) => {
        cars = createCars(carNames);

        validateRoundCount(roundsInput);

        RoundCount = Number(roundsInput);
    };

    // 게임 반복
    const play = (moveStrategies = cars.map(() => new RandomStrategy())) => {
        while (RoundCount--) {
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
