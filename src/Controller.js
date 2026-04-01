import View from './view/index.js';
import Cars from './domain/Cars/Cars.js';
import TotalRound from './domain/TotalRound/TotalRound.js';
import { randomMoveStrategy } from './moveStrategies.js';
import { parseAndTrim } from './utils.js';
import AppError from './AppError.js';

const CAR_NAMES_INPUT_SEPARATOR = ',';
const convertStringToArray = (input) =>
    parseAndTrim(input, CAR_NAMES_INPUT_SEPARATOR);

const convertStringToNumber = (input) => Number(input);

const handleGameInput = (carNamesInput, totalRoundInput) => {
    try {
        const carNames = convertStringToArray(carNamesInput);
        const totalRound = convertStringToNumber(totalRoundInput);

        const totalRoundValue = TotalRound.of(totalRound);
        const cars = Cars.of(carNames);

        const roundSnapshots = [];
        for (let i = 0; i < totalRoundValue.value; i++) {
            cars.moveAll(randomMoveStrategy);
            roundSnapshots.push(cars.snapshot);
        }
        const winnerCarNames = cars.getWinnerNames();

        View.printGameResult(roundSnapshots, winnerCarNames);
    } catch (error) {
        if (error instanceof AppError) {
            View.printErrorMessage(error.getType(), error.getMessage());
        } else throw error;
    } finally {
        View.close();
    }
};

export default function initializeApp() {
    View.onInput(handleGameInput);
}
