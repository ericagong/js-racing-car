import Cars from './Cars/index.js';
import Rounds from './Rounds/index.js';

export default function play(carNames, totalRounds, moveStrategies) {
    const cars = Cars.createCars(carNames);
    const rounds = Rounds.createRounds(totalRounds);

    for (let i = 0; i < totalRounds; i++) {
        // const currRoundMoveStrategy = moveStrategies[i];
        // Cars.moveCars(cars, currRoundMoveStrategy);
        // const currRoundMoveStrategy = moveStrategies[i];
        Cars.moveCars(cars, moveStrategies);
        rounds[i].snapshot = cars;
    }

    const roundSnapshots = Rounds.getRoundSnapshots(rounds);
    const winnerCarNames = Cars.getWinnerCarNames(cars);

    return {
        roundSnapshots,
        winnerCarNames,
    };
}
