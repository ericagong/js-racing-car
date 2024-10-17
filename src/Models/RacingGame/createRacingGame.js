import validateCarNames, { CAR_NAMES_SEPERATOR } from './validateCarNames.js';
import validateTotalRound from './validateTotalRound.js';
import { splitAndTrim } from '../utils/utils.js';
import Car from '../Car/Car.js';
import Round from '../Round/Round.js';
import RandomNumberStrategy from '../MoveStrategy/RandomNumberStrategy/RandomNumberStrategy.js';

// TODO 항상 실행 순서가 보장되어야 하는 함수 처리 방법
// 해결: Flag 도입
export default function createRacingGame(movableCondition) {
    let cars = [];
    let rounds = [];
    let winners = [];

    const set = (carNames, totalRound) => {
        validateCarNames(carNames);
        validateTotalRound(totalRound);

        const carNamesArr = splitAndTrim(carNames, CAR_NAMES_SEPERATOR);
        const totalRoundNum = Number(totalRound);

        cars = carNamesArr.map((carName) => Car.of(carName));
        rounds = Array.from({ length: totalRoundNum }, (idx) =>
            Round.of(idx + 1),
        );
    };

    const determineWinners = () => {
        const maxPosition = Math.max(...cars.map((car) => car.position));
        winners = cars.filter((car) => car.position === maxPosition);
    };

    const play = (
        moveStrategies = cars.map(
            () => new RandomNumberStrategy(movableCondition),
        ),
    ) => {
        rounds.map((round) => {
            cars = round.run(cars, moveStrategies);
        });

        determineWinners();
    };

    const getResult = () => {
        return {
            roundSnapshots: rounds.map((round) => round.snapshot),
            winnerCarNames: winners.map((car) => car.name),
        };
    };

    // TODO 모듈 내보내기 방식 차이의 기준 정리
    return {
        set,
        play,
        getResult,
    };
}
