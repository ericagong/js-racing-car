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
import validateMoveStrategies from './validateMoveStrategies.js';

const STATE = Object.freeze({
    INITIATIAL: 'Inintial',
    SET: 'Set',
    PLAYED: 'Played',
});

// Controller 로직이 아닌지 고민해보기 - set, play, getResult 모두
// 사실 Controller가 해야하는 일을 추상화 한 파일이라 느껴짐 -> Controller 하위로 위치 변경?
export default function createRacingGame() {
    let cars = [];
    let rounds = [];
    let strategies = [];
    let winners = [];
    let state = STATE.INITIATIAL;

    // moveStrategies 주입 지점을 set으로 변경
    // TODO input 검증과 핵심 로직 검증이 분리되어야 함
    // 예) input 검증은 Controller에서...
    // 예) 핵심 로직 검증은 여기서...
    const set = (carNames, totalRound, moveStrategies) => {
        if (state !== STATE.INITIATIAL) throw new NotInitialStateError();

        validateCarNames(carNames);
        validateTotalRound(totalRound);

        const carNamesArr = splitAndTrim(carNames, CAR_NAMES_SEPERATOR);
        const totalRoundNum = Number(totalRound);
        validateMoveStrategies(moveStrategies, carNamesArr.length);

        cars = carNamesArr.map((carName) => Car.of(carName));
        strategies = moveStrategies;
        rounds = Array.from({ length: totalRoundNum }, (idx) =>
            Round.of(idx + 1),
        );

        state = STATE.SET;
    };

    const determineWinners = () => {
        const maxPosition = Math.max(...cars.map((car) => car.position));
        winners = cars.filter((car) => car.position === maxPosition);
    };

    const play = () => {
        if (state !== STATE.SET) throw new NotSetStateError();

        rounds.map((round) => {
            cars = round.run(cars, strategies);
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

    return {
        set,
        play,
        getResult,
    };
}
