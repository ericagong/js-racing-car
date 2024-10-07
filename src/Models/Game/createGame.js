import createCars from '../Cars/createCars.js';
import RandomStrategy from '../MoveStrategy/RandomStrategy/RandomStrategy.js';
import validateRoundCount from '../Round/validateRoundCount.js';
import Round from '../Round/Round.js';

export default function createGame() {
    let cars = [];
    let RoundCount = 0;
    let roundIndex = 1;
    let rounds = [];

    // 게임 실행 준비
    const set = (carNames, roundsInput) => {
        cars = createCars(carNames);
        validateRoundCount(roundsInput);
        RoundCount = Number(roundsInput);
    };

    // 게임 실행 - 라운드 반복
    const play = (moveStrategies = cars.map(() => new RandomStrategy())) => {
        while (RoundCount--) {
            const round = Round.of(roundIndex++);
            cars = round.run(cars, moveStrategies);
            rounds.push(round);
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
        const roundHistory = rounds.map((round) => round.getSnapShot());
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
