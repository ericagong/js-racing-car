import { playGame } from '../src/RacingCarGame.js';

const alwaysMove = () => true;
const neverMove = () => false;

describe('playGame(carNames, totalRound, moveStrategy) 테스트', () => {
    describe('정상 입력인 경우, 게임 결과를 반환한다.', () => {
        describe('전진 조건에 부합하는 경우, 모든 자동차가 라운드 수만큼 전진한다.', () => {
            it('항상 전진 전략으로 3라운드 실행', () => {
                const { roundSnapshots, winnerCarNames } = playGame(
                    ['erica', 'ryang'],
                    3,
                    alwaysMove,
                );

                expect(roundSnapshots).toHaveLength(3);
                expect(roundSnapshots[2]).toEqual([
                    { name: 'erica', position: 3 },
                    { name: 'ryang', position: 3 },
                ]);
                expect(winnerCarNames).toEqual(['erica', 'ryang']);
            });
        });

        describe('전진 조건에 부합하지 않는 경우, 모든 자동차가 이동하지 않는다.', () => {
            it('항상 정지 전략으로 3라운드 실행', () => {
                const { roundSnapshots, winnerCarNames } = playGame(
                    ['erica', 'ryang'],
                    3,
                    neverMove,
                );

                expect(roundSnapshots).toHaveLength(3);
                expect(roundSnapshots[2]).toEqual([
                    { name: 'erica', position: 0 },
                    { name: 'ryang', position: 0 },
                ]);
                expect(winnerCarNames).toEqual(['erica', 'ryang']);
            });
        });
    });

    describe('유효하지 않은 입력인 경우, 에러가 발생한다.', () => {
        describe('자동차 이름이 5자를 초과하는 경우', () => {
            it.each([{ carNames: ['ericaa'] }, { carNames: ['toolon'] }])(
                'carNames: $carNames',
                ({ carNames }) => {
                    expect(() =>
                        playGame(carNames, 3, alwaysMove),
                    ).toThrow();
                },
            );
        });

        describe('자동차 이름이 중복되는 경우', () => {
            it.each([
                { carNames: ['erica', 'erica'] },
                { carNames: ['ryang', 'ryang'] },
            ])(
                'carNames: $carNames',
                ({ carNames }) => {
                    expect(() =>
                        playGame(carNames, 3, alwaysMove),
                    ).toThrow();
                },
            );
        });

        describe('라운드 수가 범위를 벗어나는 경우', () => {
            it.each([{ totalRound: 0 }, { totalRound: 11 }])(
                'totalRound: $totalRound',
                ({ totalRound }) => {
                    expect(() =>
                        playGame(['erica'], totalRound, alwaysMove),
                    ).toThrow();
                },
            );
        });

        describe('라운드 수가 숫자가 아닌 경우', () => {
            it.each([{ totalRound: NaN }])(
                'totalRound: $totalRound',
                ({ totalRound }) => {
                    expect(() =>
                        playGame(['erica'], totalRound, alwaysMove),
                    ).toThrow();
                },
            );
        });
    });
});

describe('라운드별 스냅샷 테스트', () => {
    describe('각 라운드의 스냅샷은 누적 결과를 반영한다.', () => {
        it('3라운드 실행 시, 각 라운드마다 position이 1씩 증가한다.', () => {
            const { roundSnapshots } = playGame(['erica'], 3, alwaysMove);

            expect(roundSnapshots[0]).toEqual([{ name: 'erica', position: 1 }]);
            expect(roundSnapshots[1]).toEqual([{ name: 'erica', position: 2 }]);
            expect(roundSnapshots[2]).toEqual([{ name: 'erica', position: 3 }]);
        });
    });

    describe('라운드 수만큼 스냅샷이 생성된다.', () => {
        it('1라운드 실행 시, 스냅샷이 1개 생성된다.', () => {
            const { roundSnapshots } = playGame(
                ['erica', 'ryang'],
                1,
                alwaysMove,
            );

            expect(roundSnapshots).toHaveLength(1);
            expect(roundSnapshots[0]).toEqual([
                { name: 'erica', position: 1 },
                { name: 'ryang', position: 1 },
            ]);
        });
    });
});
