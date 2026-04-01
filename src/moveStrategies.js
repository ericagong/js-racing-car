const MIN_NUMBER = 0;
const MAX_NUMBER = 9;
const generateRandomNumber = () =>
    Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;

const MOVE_THRESHOLD = 4;
export const randomMoveStrategy = () =>
    generateRandomNumber() >= MOVE_THRESHOLD;
