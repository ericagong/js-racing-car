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

describe('set() 테스트', () => {
    // TODO 외부에 분리되어 있는 validation 테스트 코드 가져오기
    describe('INITIAL 상태 검증 테스트', () => {
        const carNames = ['erica', 'ryang', 'yang'];
        const totalRound = 5;
        const moveStrategies = [
            alwaysMoveStrategy,
            neverMoveStrategy,
            neverMoveStrategy,
        ];
        describe('INITIAL 상태가 아닌 경우,', () => {
            it('SET 상태에서 set 함수를 호출하면 에러를 발생시킨다.', () => {
                const game = createRacingGame();
                game.set(carNames, totalRound, moveStrategies);
                expect(() =>
                    game.set(carNames, totalRound, moveStrategies),
                ).toThrow(NotInitialStateError);
            });

            it('PLAYED 상태에서 set 함수를 호출하면 에러를 발생시킨다.', () => {
                const game = createRacingGame();
                game.set(carNames, totalRound, moveStrategies);
                game.play();
                expect(() =>
                    game.set(carNames, totalRound, moveStrategies),
                ).toThrow(NotInitialStateError);
            });
        });

        it('INITIAL 상태인 경우, 에러를 발생시키지 않는다.', () => {
            const game = createRacingGame();
            expect(() =>
                game.set(carNames, totalRound, moveStrategies),
            ).not.toThrow();
        });
    });
});

describe('play() 테스트', () => {
    describe('SET 상태 검증 테스트', () => {
        const carNames = ['erica', 'ryang', 'yang'];
        const totalRound = 5;
        const moveStrategies = [
            alwaysMoveStrategy,
            neverMoveStrategy,
            neverMoveStrategy,
        ];
        describe('SET 상태가 아닌 경우,', () => {
            it('INITIAL 상태에서 play 함수를 호출하면 에러를 발생시킨다.', () => {
                const game = createRacingGame();
                expect(() => game.play()).toThrow(NotSetStateError);
            });

            it('PLAYED 상태에서 play 함수를 호출하면 에러를 발생시킨다.', () => {
                const game = createRacingGame();
                game.set(carNames, totalRound, moveStrategies);
                game.play();
                expect(() => game.play()).toThrow(NotSetStateError);
            });
        });

        it('SET 상태인 경우, 에러를 발생시키지 않는다.', () => {
            const game = createRacingGame();
            game.set(carNames, totalRound, moveStrategies);
            expect(() => game.play()).not.toThrow();
        });
    });

    describe('게임을 총 10 라운드 진행한다.', () => {
        const game = createRacingGame();
        const moveStrategies = [
            alwaysMoveStrategy,
            neverMoveStrategy,
            neverMoveStrategy,
            neverMoveStrategy,
            neverMoveStrategy,
        ];
        game.set(
            ['erica', 'Erica', 'ryang', 'yang', 'theon'],
            10,
            moveStrategies,
        );
        game.play();
        const gameResult = game.getResult();

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
    describe('PLAYED 상태 검증 테스트', () => {
        const carNames = ['erica', 'ryang', 'yang'];
        const totalRound = 5;
        const moveStrategies = [
            alwaysMoveStrategy,
            neverMoveStrategy,
            neverMoveStrategy,
        ];

        describe('PLAYED 상태가 아닌 경우,', () => {
            it('INITIAL 상태에서 getResult 함수를 호출하면 에러를 발생시킨다.', () => {
                const game = createRacingGame();
                expect(() => game.getResult()).toThrow(NotPlayedStateError);
            });

            it('SET 상태에서 getResult 함수를 호출하면 에러를 발생시킨다.', () => {
                const game = createRacingGame();
                game.set(carNames, totalRound, moveStrategies);
                expect(() => game.getResult()).toThrow(NotPlayedStateError);
            });
        });

        it('PLAYED 상태인 경우, 에러를 발생시키지 않는다.', () => {
            const game = createRacingGame();
            game.set(carNames, totalRound, moveStrategies);
            game.play();
            expect(() => game.getResult()).not.toThrow();
        });
    });

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
                set(
                    ['erica', 'Erica', 'ryang', 'yang', 'theon'],
                    5,
                    strategies,
                );
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
        set(['erica', 'Erica', 'ryang', 'yang', 'theon'], 5, strategies);
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
