// 미션 요구사항: 0-9 사이의 임의의 숫자를 생성하여, 4 이상일 때 전진
const MIN_NUMBER = 0;
const MAX_NUMBER = 9;
const generateRandomNumber = () =>
    Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;

const MOVE_THRESHOLD = 4;
export const randomMoveStrategy = () =>
    generateRandomNumber() >= MOVE_THRESHOLD;
