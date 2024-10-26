import Round from '../../entities/Round/Round.js';

export default function createRounds(totalRound) {
    return Array.from({ length: totalRound }, (_, idx) => Round.of(idx + 1));
}
