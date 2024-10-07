import createRacingGame from '../src/Models/RacingGame/createRacingGame.js';
import MoveStrategies from './Fixture/MoveStrategies.js';

describe('play() 테스트', () => {
    const { set, play, getResult } = createRacingGame();
    describe('게임을 총 5라운드 진행한다.', () => {
        set('erica, Erica, ryang, yang, theon', 5);
        play(new MoveStrategies('50011'));
        const gameResult = getResult();

        it('게임을 총 5라운드 진행한다.', () => {
            expect(gameResult.roundHistory).toHaveLength(5);
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
        it.each([
            {
                strategies: '50000',
                winnerNames: ['erica'],
                winnerCount: 1,
            },
            {
                strategies: '55000',
                winnerNames: ['erica', 'Erica'],
                winnerCount: 2,
            },
            {
                strategies: '55500',
                winnerNames: ['erica', 'Erica', 'ryang'],
                winnerCount: 3,
            },
            {
                strategies: '55550',
                winnerNames: ['erica', 'Erica', 'ryang', 'yang'],
                winnerCount: 4,
            },
            {
                strategies: '55555',
                winnerNames: ['erica', 'Erica', 'ryang', 'yang', 'theon'],
                winnerCount: 5,
            },
        ])('winnerNames: $winnerNames', ({ winnerNames, strategies }) => {
            set('erica, Erica, ryang, yang, theon', 5);
            play(new MoveStrategies(strategies));
            expect(getResult().winnerNames).toEqual(winnerNames);
        });
    });

    describe('게임 기록과 우승자 정보를 반환한다.', () => {
        const { set, play, getResult } = createRacingGame();
        set('erica, Erica, ryang, yang, theon', 5);
        play(new MoveStrategies('50011'));
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
