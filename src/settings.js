// 게임 관련 setting 상수
export const RANDOM_NUM_LOWER_LIMIT = 0;
export const RANDOM_NUM_UPPER_LIMIT = 9;
export const ROUND_START = 1;
export const ROUND_END = 5;
export const CAR_MOVE_STEP = 1;
export const CAR_MOVE_CRITERIA = 4;
export const CAN_MOVE = (randomNumber) => {
    return randomNumber >= CAR_MOVE_CRITERIA;
};

// Car 객체 관련 setting 상수
export const CAR_INIT_POSITION = 0;
