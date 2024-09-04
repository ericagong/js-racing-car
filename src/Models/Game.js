import { Cars } from './Cars';

export const Game = (function () {
    const roundHistory = [];
    let cars = [];
    let totalRounds = 0;
    const ERROR_MESSAGE = Object.freeze({
        EMPTY: '빈 값으로는 프로그램이 동작할 수 없습니다.',
        NOT_NUMBER: '시도 횟수로는 숫자를 입력해주세요.',
        NOT_INTEGER: '시도 횟수로는 정수를 입력해주세요.',
        NOT_POSITIVE: '시도 횟수로는 1 이상의 숫자를 입력해주세요.',
    });

    function validateUserInput(input) {
        if (!input) throw new Error(ERROR_MESSAGE.EMPTY);
    }

    function validateRoundsInput(input) {
        if (!input) throw new Error(ERROR_MESSAGE.EMPTY);

        const round = Number(input);
        if (isNaN(round)) throw new Error(ERROR_MESSAGE.NOT_NUMBER);
        if (!Number.isInteger(round))
            throw new Error(ERROR_MESSAGE.NOT_INTEGER);
        if (round < 1) throw new Error(ERROR_MESSAGE.NOT_POSITIVE);
    }

    function parseCarNames(userInput) {
        return userInput.split(',').map((carName) => carName.trim());
    }

    function setGame(carNamesInput, roundsInput) {
        validateUserInput(carNamesInput);

        validateRoundsInput(roundsInput);

        const carNames = parseCarNames(carNamesInput);

        cars = Cars.from(carNames);
        totalRounds = Number(roundsInput);
    }

    function playGame() {
        while (totalRounds--) {
            Cars.playOneRound(cars);

            roundHistory.push(Cars.getRoundRecord(cars));
        }
    }

    function getWinners() {
        const maxPosition = Math.max(...cars.map((car) => car.position));

        return cars.filter((car) => car.position === maxPosition);
    }

    function getGameResult() {
        const winners = getWinners();
        const winnerNames = winners.map((winner) => winner.name);

        return {
            roundHistory,
            winnerNames,
        };
    }

    return {
        // CHECK 테스트 코드를 위해 public으로 빼는게 맞는지?
        ERROR_MESSAGE,
        setGame,
        playGame,
        getGameResult,
    };
})();
