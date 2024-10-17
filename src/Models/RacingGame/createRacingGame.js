import {
    NotInitialStateError,
    NotSetStateError,
    NotPlayedStateError,
} from './errors.js';
import validateCarNames, { CAR_NAMES_SEPERATOR } from './validateCarNames.js';
import validateTotalRound from './validateTotalRound.js';
import { splitAndTrim } from '../utils/utils.js';
import Car from '../Car/Car.js';
import Round from '../Round/Round.js';
import RandomNumberStrategy from '../MoveStrategy/RandomNumberStrategy/RandomNumberStrategy.js';

const STATE = Object.freeze({
    INITIATIAL: 'Inintial',
    SET: 'Set',
    PLAYED: 'Played',
});

export default function createRacingGame(movableCondition) {
    let cars = [];
    let rounds = [];
    let winners = [];
    let state = STATE.INITIATIAL;

    const set = (carNames, totalRound) => {
        if (state !== STATE.INITIATIAL) throw new NotInitialStateError();

        validateCarNames(carNames);
        validateTotalRound(totalRound);

        const carNamesArr = splitAndTrim(carNames, CAR_NAMES_SEPERATOR);
        const totalRoundNum = Number(totalRound);

        cars = carNamesArr.map((carName) => Car.of(carName));
        rounds = Array.from({ length: totalRoundNum }, (idx) =>
            Round.of(idx + 1),
        );

        state = STATE.SET;
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
        if (state !== STATE.SET) throw new NotSetStateError();

        rounds.map((round) => {
            cars = round.run(cars, moveStrategies);
        });

        determineWinners();

        state = STATE.PLAYED;
    };

    const getResult = () => {
        if (state !== STATE.PLAYED) throw new NotPlayedStateError();

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
