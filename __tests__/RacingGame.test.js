import createRacingGame from '../src/Models/RacingGame/createRacingGame.js';
import MoveStrategy from '../src/Models/MoveStrategy/MoveStrategy.js';
import {
    NotInitialStateError,
    NotSetStateError,
    NotPlayedStateError,
} from '../src/Models/RacingGame/errors.js';

// TODO 함수 기준으로 테스트 코드 구조화
const movableCondition = (num) => num === 5;
const step = 1;
const alwaysMoveStrategy = new MoveStrategy(movableCondition, () => 5, step);
const neverMoveStrategy = new MoveStrategy(movableCondition, () => 0, step);

describe('createRacingGame 내 메소드 호출 순서 테스트', () => {
    const carNames = 'erica, ryang, yang';
    const totalRound = 5;
    const moveStrategies = [
        alwaysMoveStrategy,
        neverMoveStrategy,
        neverMoveStrategy,
    ];

    describe('INITIAL 상태에서,', () => {
        let game;
        beforeEach(() => {
            game = createRacingGame();
        });

        it('set 함수 호출 시 에러를 발생시키지 않는다.', () => {
            expect(() =>
                game.set(carNames, totalRound, moveStrategies),
            ).not.toThrow();
        });

        it('play 함수 호출 시 NotSetStateError를 발생 시킨다.', () => {
            expect(() => game.play()).toThrow(NotSetStateError);
        });

        it('getResult 함수 호출 시 NotPlayedStateError를 발생 시킨다.', () => {
            expect(() => game.getResult()).toThrow(NotPlayedStateError);
        });
    });

    describe('SET 상태에서,', () => {
        let game;
        beforeEach(() => {
            game = createRacingGame();
            game.set(carNames, totalRound, moveStrategies);
        });

        it('set 함수 호출 시 NotInitialStateError를 발생 시킨다.', () => {
            expect(() =>
                game.set(carNames, totalRound, moveStrategies),
            ).toThrow(NotInitialStateError);
        });

        it('play 함수 호출 시 에러를 발생시키지 않는다.', () => {
            expect(() => game.play()).not.toThrow();
        });

        it('getResult 함수 호출 시 NotPlayedStateError를 발생 시킨다.', () => {
            expect(() => game.getResult()).toThrow(NotPlayedStateError);
        });
    });

    describe('PLAYED 상태에서,', () => {
        let game;
        beforeEach(() => {
            game = createRacingGame();
            game.set(carNames, totalRound, moveStrategies);
            game.play();
        });

        it('set 함수 호출 시 NotInitialStateError를 발생 시킨다.', () => {
            expect(() =>
                game.set(carNames, totalRound, moveStrategies),
            ).toThrow(NotInitialStateError);
        });

        it('play 함수 호출 시 NotSetStateError를 발생 시킨다.', () => {
            expect(() => game.play()).toThrow(NotSetStateError);
        });

        it('getResult 함수 호출 시 에러를 발생시키지 않는다.', () => {
            expect(() => game.getResult()).not.toThrow();
        });
    });
});

describe('play() 테스트', () => {
    const { set, play, getResult } = createRacingGame();

    describe('게임을 총 10 라운드 진행한다.', () => {
        const moveStrategies = [
            alwaysMoveStrategy,
            neverMoveStrategy,
            neverMoveStrategy,
            neverMoveStrategy,
            neverMoveStrategy,
        ];
        set('erica, Erica, ryang, yang, theon', 10, moveStrategies);
        play();
        const gameResult = getResult();

        it('게임을 총 10라운드 진행한다.', () => {
            expect(gameResult.roundSnapshots).toHaveLength(10);
        });

        it('각 라운드 별 기록을 올바르게 roundHistory에 저장한다.', () => {
            gameResult.roundSnapshots.forEach((roundRecord, idx) => {
                expect(roundRecord).toEqual([
                    { name: 'erica', position: idx + 1 },
                    { name: 'Erica', position: 0 },
                    { name: 'ryang', position: 0 },
                    { name: 'yang', position: 0 },
                    { name: 'theon', position: 0 },
                ]);
            });
        });
    });
});

describe('getResult() 테스트', () => {
    describe('올바른 우승자를 반환한다.', () => {
        it.each([
            {
                strategies: [
                    alwaysMoveStrategy,
                    neverMoveStrategy,
                    neverMoveStrategy,
                    neverMoveStrategy,
                    neverMoveStrategy,
                ],
                winnerCarNames: ['erica'],
                winnerCount: 1,
            },
            {
                strategies: [
                    alwaysMoveStrategy,
                    alwaysMoveStrategy,
                    neverMoveStrategy,
                    neverMoveStrategy,
                    neverMoveStrategy,
                ],
                winnerCarNames: ['erica', 'Erica'],
                winnerCount: 2,
            },
            {
                strategies: [
                    alwaysMoveStrategy,
                    alwaysMoveStrategy,
                    alwaysMoveStrategy,
                    neverMoveStrategy,
                    neverMoveStrategy,
                ],
                winnerCarNames: ['erica', 'Erica', 'ryang'],
                winnerCount: 3,
            },
            {
                strategies: [
                    alwaysMoveStrategy,
                    alwaysMoveStrategy,
                    alwaysMoveStrategy,
                    alwaysMoveStrategy,
                    neverMoveStrategy,
                ],
                winnerCarNames: ['erica', 'Erica', 'ryang', 'yang'],
                winnerCount: 4,
            },
            {
                strategies: [
                    alwaysMoveStrategy,
                    alwaysMoveStrategy,
                    alwaysMoveStrategy,
                    alwaysMoveStrategy,
                    alwaysMoveStrategy,
                ],
                winnerCarNames: ['erica', 'Erica', 'ryang', 'yang', 'theon'],
                winnerCount: 5,
            },
        ])(
            'winnerCarNames: $winnerCarNames',
            ({ winnerCarNames, strategies }) => {
                const { set, play, getResult } = createRacingGame();
                set('erica, Erica, ryang, yang, theon', 5, strategies);
                play();
                expect(getResult().winnerCarNames).toEqual(winnerCarNames);
            },
        );
    });

    describe('게임 기록과 우승자 정보를 반환한다.', () => {
        const { set, play, getResult } = createRacingGame();
        const strategies = [
            alwaysMoveStrategy,
            neverMoveStrategy,
            neverMoveStrategy,
            neverMoveStrategy,
            neverMoveStrategy,
        ];
        set('erica, Erica, ryang, yang, theon', 5, strategies);
        play();
        const gameResult = getResult();
        gameResult.roundSnapshots.forEach((roundRecord, idx) => {
            expect(roundRecord).toEqual([
                { name: 'erica', position: idx + 1 },
                { name: 'Erica', position: 0 },
                { name: 'ryang', position: 0 },
                { name: 'yang', position: 0 },
                { name: 'theon', position: 0 },
            ]);
        });
        expect(gameResult.winnerCarNames).toEqual(['erica']);
    });
});
