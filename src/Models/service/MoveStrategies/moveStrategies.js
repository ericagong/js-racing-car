import MoveStrategy from '../../entities/MoveStrategy/MoveStrategy.js';

// 미션에서 설정된 게임 내 이동전략
const MOVABLE_CONDITION = (number) => number >= 4;
const MIN_NUMBER = 0;
const MAX_NUMBER = 9;
const GENERATE_RANDOM_NUMBER = () =>
    Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
const STEP = 1;

// randomNumberStrategy는 자동차 미션에서 설정된,
// 0-9 사이의 임의의 숫자를 생성하여, 숫자가 4 이상일 때만 이동하는 전략
export const randomNumberStrategy = new MoveStrategy(
    MOVABLE_CONDITION,
    GENERATE_RANDOM_NUMBER,
    STEP,
);

// 이 외에도 하단처럼 다양한 이동 전략을 설정하여, 각 자동차별로 적용 가능
// export const alwaysMoveStrategy = new MoveStrategy(
//     () => true,
//     () => {},
//     1,
// );
// export const neverMoveStrategy = new MoveStrategy(
//     () => false,
//     () => {},
//     1,
// );
