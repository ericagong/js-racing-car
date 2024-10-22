import { NotSetStateError, NotPlayedStateError } from './errors.js';
import Car from '../Car/Car.js';
import Round from '../Round/Round.js';
import validateMoveStrategies from './MoveStrategies.js';

const STATE = Object.freeze({
    SET: 'Set',
    PLAYED: 'Played',
});

// Controller 로직이 아닌지 고민해보기 - constructor, play, get* 모두 -> Controller 로직을 추상화 한 파일이 아닌지 질문하기
// TODO 불필요한 상태 관리 제거 -> 함수 분리에 따른 상태 관리 필드 수 증가 질문
export default class RacingGame {
    #state;
    #cars;
    #rounds;
    #moveStrategies;
    #winnerCars;

    constructor(carNames, totalRound, moveStrategies) {
        validateMoveStrategies(moveStrategies, carNames.length);

        this.#cars = carNames.map((carName) => Car.of(carName));
        this.#moveStrategies = moveStrategies;
        this.#rounds = Array.from({ length: totalRound }, (idx) =>
            Round.of(idx + 1),
        );
        this.#state = STATE.SET;
    }

    play() {
        if (this.#state !== STATE.SET) throw new NotSetStateError();

        this.#rounds.map((round) => {
            this.#cars = round.run(this.#cars, this.#moveStrategies);
        });

        this.#state = STATE.PLAYED;
    }

    getRoundSnapshots() {
        if (this.#state !== STATE.PLAYED) throw new NotPlayedStateError();

        const roundSnapshots = this.#rounds.map((round) => round.snapshot);
        return roundSnapshots;
    }

    #determineWinnerCars() {
        const maxPosition = Math.max(...this.#cars.map((car) => car.position));
        this.#winnerCars = this.#cars.filter(
            (car) => car.position === maxPosition,
        );
    }

    getWinnerCarNames() {
        if (this.#state !== STATE.PLAYED) throw new NotPlayedStateError();

        this.#determineWinnerCars();
        return this.#winnerCars.map((car) => car.name);
    }
}
