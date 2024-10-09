import createCars from '../Cars/createCars.js';
import RandomNumberStrategy from '../MoveStrategy/RandomNumberStrategy/RandomNumberStrategy.js';
import validateRoundCount from '../Round/validateTotalRound.js';
import Round from '../Round/Round.js';

// TODO 항상 실행 순서가 보장되어야 하는 함수들은 어떻게 처리하는게 좋을지? - set -> play -> getResult
// TODO moveStrategies를 createGame 시, 외부주입 받는 형태로 변경
export default function createRacingGame() {
    let cars = [];
    let totalRound = 0;
    let rounds = [];

    const set = (carNames, roundsInput) => {
        cars = createCars(carNames);
        validateRoundCount(roundsInput);
        totalRound = Number(roundsInput);
    };

    const movableCondition = (num) => num >= 4;
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

    // TODO module 내보내기 방식 차이 질문
    return {
        set,
        play,
        getResult,
    };
}
