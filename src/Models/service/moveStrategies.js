import MoveStrategy from '../entities/MoveStrategy/MoveStrategy.js';

// 미션에서 설정된 게임 내 이동전략
const MOVABLE_CONDITION = (number) => number >= 4;
const MIN_NUMBER = 0;
const MAX_NUMBER = 9;
const GENERATE_RANDOM_NUMBER = () =>
    Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
const STEP = 1;

export const randomNumberStrategy = new MoveStrategy(
    MOVABLE_CONDITION,
    GENERATE_RANDOM_NUMBER,
    STEP,
);

// 이 외에도 다양한 이동 전략을 설정하여, 각 라운드별, 각 자동차별로 적용 가능
