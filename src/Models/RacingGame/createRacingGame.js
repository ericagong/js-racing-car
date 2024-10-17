import createCars from '../Cars/createCars.js';
import RandomNumberStrategy from '../MoveStrategy/RandomNumberStrategy/RandomNumberStrategy.js';
import validateRoundCount from '../Round/validateTotalRound.js';
import Round from '../Round/Round.js';

// TODO 항상 실행 순서가 보장되어야 하는 함수 처리 방법
// 해결: Flag 도입
export default function createRacingGame(movableCondition) {
    let cars = [];
    let totalRound = 0;
    let rounds = [];

    const set = (carNames, roundsInput) => {
        cars = createCars(carNames);
        validateRoundCount(roundsInput);
        totalRound = Number(roundsInput);
    };

    const play = (
        moveStrategies = cars.map(
            () => new RandomNumberStrategy(movableCondition),
        ),
    ) => {
        Array.from({ length: totalRound }).forEach((_, idx) => {
            const round = Round.of(idx + 1);
            cars = round.run(cars, moveStrategies);
            rounds.push(round);
        });
    };

    const getWinnerNames = () => {
        const maxPosition = Math.max(...cars.map((car) => car.position));
        return cars
            .filter((car) => car.position === maxPosition)
            .map((car) => car.name);
    };

    const getResult = () => {
        return {
            roundHistory: rounds.map((round) => round.snapshot),
            winnerNames: getWinnerNames(),
        };
    };

    // TODO 모듈 내보내기 방식 차이의 기준 정리
    return {
        set,
        play,
        getResult,
    };
}
