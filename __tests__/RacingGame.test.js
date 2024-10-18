import RacingGame from '../src/Models/RacingGame/RacingGame.js';
import MoveStrategy from '../src/Models/MoveStrategy/MoveStrategy.js';
import {
    NotSetStateError,
    NotPlayedStateError,
} from '../src/Models/RacingGame/errors.js';

const movableCondition = (num) => num === 5;
const step = 1;
const alwaysMoveStrategy = new MoveStrategy(movableCondition, () => 5, step);
const neverMoveStrategy = new MoveStrategy(movableCondition, () => 0, step);

describe('RacingGame 테스트', () => {
    describe('RacingGame 생성자 테스트', () => {
        // TODO 외부에 분리되어 있는 validation 테스트 코드 가져오기
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
                it('PLAYED 상태에서 play 함수를 호출하면 에러를 발생시킨다.', () => {
                    const game = new RacingGame(
                        carNames,
                        totalRound,
                        moveStrategies,
                    );
                    game.play();
                    expect(() => game.play()).toThrow(NotSetStateError);
                });
            });

            it('SET 상태인 경우, 에러를 발생시키지 않는다.', () => {
                const game = new RacingGame(
                    carNames,
                    totalRound,
                    moveStrategies,
                );
                expect(() => game.play()).not.toThrow();
            });
        });

        describe('10번 라운드 진행 테스트', () => {
            const moveStrategies = [
                alwaysMoveStrategy,
                neverMoveStrategy,
                neverMoveStrategy,
                neverMoveStrategy,
                neverMoveStrategy,
            ];
            const game = new RacingGame(
                ['erica', 'Erica', 'ryang', 'yang', 'theon'],
                10,
                moveStrategies,
            );
            game.play();
            const roundSnapshots = game.getRoundSnapshots();

            it('총 10라운드를 진행한다.', () => {
                expect(roundSnapshots).toHaveLength(10);
            });

            it('각 라운드 별 SnapShot을 저장한다.', () => {
                roundSnapshots.forEach((roundRecord, idx) => {
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

    describe('getRoundSnapshots() 테스트', () => {
        describe('PLAYED 상태 검증 테스트', () => {
            const carNames = ['erica', 'ryang', 'yang'];
            const totalRound = 5;
            const moveStrategies = [
                alwaysMoveStrategy,
                neverMoveStrategy,
                neverMoveStrategy,
            ];

            it('PLAYED가 아닌 state에서 getRoundSnapshots 함수를 호출하면 에러를 발생시킨다.', () => {
                const game = new RacingGame(
                    carNames,
                    totalRound,
                    moveStrategies,
                );
                expect(() => game.getRoundSnapshots()).toThrow(
                    NotPlayedStateError,
                );
            });

            it('PLAYED 상태인 경우, 에러를 발생시키지 않는다.', () => {
                const game = new RacingGame(
                    carNames,
                    totalRound,
                    moveStrategies,
                );
                game.play();
                expect(() => game.getRoundSnapshots()).not.toThrow();
            });
        });

        describe('라운드 snapshot을 원소로 한 배열을 반환한다.', () => {
            const strategies = [
                alwaysMoveStrategy,
                neverMoveStrategy,
                neverMoveStrategy,
                neverMoveStrategy,
                neverMoveStrategy,
            ];
            const game = new RacingGame(
                ['erica', 'Erica', 'ryang', 'yang', 'theon'],
                5,
                strategies,
            );
            game.play();
            const roundSnapshots = game.getRoundSnapshots();
            roundSnapshots.forEach((roundRecord, idx) => {
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

    describe('getWinnerCarNames() 테스트', () => {
        describe('PLAYED 상태 검증 테스트', () => {
            const carNames = ['erica', 'ryang', 'yang'];
            const totalRound = 5;
            const moveStrategies = [
                alwaysMoveStrategy,
                neverMoveStrategy,
                neverMoveStrategy,
            ];

            it('PLAYED가 아닌 state에서 getResult 함수를 호출하면 에러를 발생시킨다.', () => {
                const game = new RacingGame(
                    carNames,
                    totalRound,
                    moveStrategies,
                );
                expect(() => game.getWinnerCarNames()).toThrow(
                    NotPlayedStateError,
                );
            });

            it('PLAYED state인 경우, 에러를 발생시키지 않는다.', () => {
                const game = new RacingGame(
                    carNames,
                    totalRound,
                    moveStrategies,
                );
                game.play();
                expect(() => game.getWinnerCarNames()).not.toThrow();
            });
        });

        describe('게임 우승자 이름 배열을 반환한다.', () => {
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
                    winnerCarNames: [
                        'erica',
                        'Erica',
                        'ryang',
                        'yang',
                        'theon',
                    ],
                    winnerCount: 5,
                },
            ])(
                'winnerCarNames: $winnerCarNames',
                ({ winnerCarNames, strategies }) => {
                    const game = new RacingGame(
                        ['erica', 'Erica', 'ryang', 'yang', 'theon'],
                        5,
                        strategies,
                    );
                    game.play();
                    expect(game.getWinnerCarNames()).toEqual(winnerCarNames);
                },
            );
        });
    });
});
