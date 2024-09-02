import Car from './Car.js';
import View from './View.js';
import { GAME_INIT_ROUND, TOTAL_GAME_ROUNDS } from './settings.js';
import { getRandomNumber } from './utils.js';

export default class GameController {
    #cars;
    #view;
    #currRound;
    #winners;
    #playRoundCalls;

    constructor(carNames) {
        this.#cars = carNames.map((name) => new Car(name));
        this.#view = new View();
        this.#currRound = GAME_INIT_ROUND;
        this.#winners = [];
        this.#playRoundCalls = 0;
    }

    get cars() {
        return this.#cars;
    }

    get view() {
        return this.#view;
    }

    get currRound() {
        return this.#currRound;
    }

    get winners() {
        return this.#winners;
    }

    get playRoundCalls() {
        return this.#playRoundCalls;
    }

    #playRound() {
        this.#cars.forEach((car) => {
            car.tryMoveWith(getRandomNumber());
        });

        this.#playRoundCalls += 1;

        this.#view.logRoundStatus(this);
    }

    #setWinners() {
        const maxPosition = Math.max(...this.#cars.map((car) => car.position));
        this.#winners = this.#cars.filter(
            (car) => car.position === maxPosition,
        );
    }

    play() {
        this.#view.logResultGuideMessage();

        while (this.#currRound <= TOTAL_GAME_ROUNDS) {
            this.#playRound();
            this.#currRound += 1;
        }

        this.#setWinners();
        this.#view.logWinners(this.#winners);
    }
}
