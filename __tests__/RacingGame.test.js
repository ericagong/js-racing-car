import createRacingGame from '../src/Models/RacingGame/createRacingGame.js';
import FixedNumberStrategy from './Fixture/FixedNumberStrategy.js';
import {
    NotInitialStateError,
    NotSetStateError,
    NotPlayedStateError,
} from '../src/Models/RacingGame/errors.js';

describe('createRacingGame 내 메소드 호출 순서 테스트', () => {
    let game;

    beforeEach(() => {
        game = createRacingGame(() => true);
    });

    describe('INITIAL 상태에서,', () => {
        it('play 함수 호출 시 NotSetStateError를 발생 시킨다.', () => {
            expect(() => game.play()).toThrow(NotSetStateError);
        });

        it('getResult 함수 호출 시 NotPlayedStateError를 발생 시킨다.', () => {
            expect(() => game.getResult()).toThrow(NotPlayedStateError);
        });
    });

    describe('SET 상태에서,', () => {
        beforeEach(() => {
            game.set('car1,car2,car3', 5);
        });

        it('set 함수 호출 시 NotInitialStateError를 발생 시킨다.', () => {
            expect(() => game.set('car1,car2,car3', 5)).toThrow(
                NotInitialStateError,
            );
        });

        it('getResult 함수 호출 시 NotPlayedStateError를 발생 시킨다.', () => {
            expect(() => game.getResult()).toThrow(NotPlayedStateError);
        });
    });

    describe('PLAYED 상태에서,', () => {
        beforeEach(() => {
            game.set('car1,car2,car3', 5);
            game.play();
        });

        it('set 함수 호출 시 NotInitialStateError를 발생 시킨다.', () => {
            expect(() => game.set('car1,car2,car3', 5)).toThrow(
                NotInitialStateError,
            );
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
        set('erica, Erica, ryang, yang, theon', 10);
        const defaultMovableCondition = (num) => num === 5;
        const moveStrategies = [
            new FixedNumberStrategy(defaultMovableCondition, 5),
            new FixedNumberStrategy(defaultMovableCondition, 0),
            new FixedNumberStrategy(defaultMovableCondition, 0),
            new FixedNumberStrategy(defaultMovableCondition, 0),
            new FixedNumberStrategy(defaultMovableCondition, 0),
        ];
        play(moveStrategies);
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
        const defaultMovableCondition = (num) => num === 5;
        it.each([
            {
                strategies: [
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 0),
                    new FixedNumberStrategy(defaultMovableCondition, 0),
                    new FixedNumberStrategy(defaultMovableCondition, 0),
                    new FixedNumberStrategy(defaultMovableCondition, 0),
                ],
                winnerCarNames: ['erica'],
                winnerCount: 1,
            },
            {
                strategies: [
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 0),
                    new FixedNumberStrategy(defaultMovableCondition, 0),
                    new FixedNumberStrategy(defaultMovableCondition, 0),
                ],
                winnerCarNames: ['erica', 'Erica'],
                winnerCount: 2,
            },
            {
                strategies: [
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 0),
                    new FixedNumberStrategy(defaultMovableCondition, 0),
                ],
                winnerCarNames: ['erica', 'Erica', 'ryang'],
                winnerCount: 3,
            },
            {
                strategies: [
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 0),
                ],
                winnerCarNames: ['erica', 'Erica', 'ryang', 'yang'],
                winnerCount: 4,
            },
            {
                strategies: [
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                    new FixedNumberStrategy(defaultMovableCondition, 5),
                ],
                winnerCarNames: ['erica', 'Erica', 'ryang', 'yang', 'theon'],
                winnerCount: 5,
            },
        ])(
            'winnerCarNames: $winnerCarNames',
            ({ winnerCarNames, strategies }) => {
                const { set, play, getResult } = createRacingGame();
                set('erica, Erica, ryang, yang, theon', 5);
                play(strategies);
                expect(getResult().winnerCarNames).toEqual(winnerCarNames);
            },
        );
    });

    describe('게임 기록과 우승자 정보를 반환한다.', () => {
        const { set, play, getResult } = createRacingGame();
        set('erica, Erica, ryang, yang, theon', 5);
        const defaultMovableCondition = (num) => num === 5;
        const moveStrategies = [
            new FixedNumberStrategy(defaultMovableCondition, 5),
            new FixedNumberStrategy(defaultMovableCondition, 0),
            new FixedNumberStrategy(defaultMovableCondition, 0),
            new FixedNumberStrategy(defaultMovableCondition, 0),
            new FixedNumberStrategy(defaultMovableCondition, 0),
        ];

        play(moveStrategies);
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
