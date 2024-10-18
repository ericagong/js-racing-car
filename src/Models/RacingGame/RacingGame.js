import { NotSetStateError, NotPlayedStateError } from './errors.js';
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
export default class RacingGame {
    #cars;
    #rounds;
    #strategies;
    #winners;
    #state;

    constructor(carNames, totalRound, moveStrategies) {
        validateMoveStrategies(moveStrategies, carNames.length);

        this.#cars = carNames.map((carName) => Car.of(carName));
        this.#strategies = moveStrategies;
        this.#rounds = Array.from({ length: totalRound }, (idx) =>
            Round.of(idx + 1),
        );
        this.#state = STATE.SET;
    }

    #determineWinners() {
        const maxPosition = Math.max(...this.#cars.map((car) => car.position));
        this.#winners = this.#cars.filter(
            (car) => car.position === maxPosition,
        );
    }

    play() {
        if (this.#state !== STATE.SET) throw new NotSetStateError();

        this.#rounds.map((round) => {
            this.#cars = round.run(this.#cars, this.#strategies);
        });

        this.#determineWinners();

        this.#state = STATE.PLAYED;
    }

    // 마지막 snapshot을 보고 판단하게 처리
    getResult() {
        if (this.#state !== STATE.PLAYED) throw new NotPlayedStateError();

        return {
            roundSnapshots: this.#rounds.map((round) => round.snapshot),
            winnerCarNames: this.#winners.map((car) => car.name),
        };
    }
}
