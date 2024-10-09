import createRacingGame from '../src/Models/RacingGame/createRacingGame.js';
import FixedNumberStrategy from './Fixture/FixedNumberStrategy.js';

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
            expect(gameResult.roundHistory).toHaveLength(10);
        });

        it('각 라운드 별 기록을 올바르게 roundHistory에 저장한다.', () => {
            gameResult.roundHistory.forEach((roundRecord, idx) => {
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
        const { set, play, getResult } = createRacingGame();
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
                winnerNames: ['erica'],
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
                winnerNames: ['erica', 'Erica'],
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
                winnerNames: ['erica', 'Erica', 'ryang'],
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
                winnerNames: ['erica', 'Erica', 'ryang', 'yang'],
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
                winnerNames: ['erica', 'Erica', 'ryang', 'yang', 'theon'],
                winnerCount: 5,
            },
        ])('winnerNames: $winnerNames', ({ winnerNames, strategies }) => {
            set('erica, Erica, ryang, yang, theon', 5);

            play(strategies);
            expect(getResult().winnerNames).toEqual(winnerNames);
        });
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
        gameResult.roundHistory.forEach((roundRecord, idx) => {
            expect(roundRecord).toEqual([
                { name: 'erica', position: idx + 1 },
                { name: 'Erica', position: 0 },
                { name: 'ryang', position: 0 },
                { name: 'yang', position: 0 },
                { name: 'theon', position: 0 },
            ]);
        });
        expect(gameResult.winnerNames).toEqual(['erica']);
    });
});
