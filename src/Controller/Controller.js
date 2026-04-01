import View from '../View/index.js';
import Cars from '../Domain/Cars/Cars.js';
import { randomMoveStrategy } from '../Domain/moveStrategies.js';
import { parseAndTrim } from '../utils.js';
import {
    validateCarNamesInput,
    validateTotalRoundInput,
} from './validateInput.js';
import AppError from '../AppError.js';

const CAR_NAMES_INPUT_SEPERATOR = ',';
const runRacingGame = (carNamesInput, totalRoundInput) => {
    try {
        validateCarNamesInput(carNamesInput);
        validateTotalRoundInput(totalRoundInput);

        const carNames = parseAndTrim(carNamesInput, CAR_NAMES_INPUT_SEPERATOR);
        const totalRound = Number(totalRoundInput);

        const cars = Cars.of(carNames);

        const roundSnapshots = [];
        for (let i = 0; i < totalRound; i++) {
            cars.moveAll(randomMoveStrategy);
            roundSnapshots.push(cars.snapshot);
        }

        const winnerNames = cars.getWinnerNames();

        View.printGameResult(roundSnapshots, winnerNames);

        View.closeInputReader();
    } catch (error) {
        if (error instanceof AppError) {
            View.printErrorMessage(error.getType(), error.getMessage());

            setRacingGameEnvironment();
        } else throw error;
    }
};

export default function setRacingGameEnvironment() {
    View.addEventHandlerToInputReader(runRacingGame);
}
