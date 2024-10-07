import createCars from '../Cars/createCars.js';
import RandomStrategy from '../MoveStrategy/RandomStrategy/RandomStrategy.js';
import validateRoundCount from '../Round/validateRoundCount.js';
import Round from '../Round/Round.js';

export default function createGame() {
    let cars = [];
    let totalRounds = 0;
    let rounds = [];

    // 게임 실행 준비
    const set = (carNames, roundsInput) => {
        cars = createCars(carNames);
        validateRoundCount(roundsInput);
        totalRounds = Number(roundsInput);
    };

    // 게임 실행 - 라운드 반복
    const play = (moveStrategies = cars.map(() => new RandomStrategy())) => {
        Array.from({ length: totalRounds }).forEach((_, idx) => {
            const round = Round.of(idx + 1);
            cars = round.run(cars, moveStrategies);
            rounds.push(round);
        });
    };

    // 최종 우승자 추출
    const getWinnerNames = () => {
        const maxPosition = Math.max(...cars.map((car) => car.getPosition()));
        return cars
            .filter((car) => car.getPosition() === maxPosition)
            .map((car) => car.getName());
    };

    // 최종 결과 추출
    const getResult = () => {
        const roundHistory = rounds.map((round) => round.getSnapShot());
        const winnerNames = getWinnerNames();
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
