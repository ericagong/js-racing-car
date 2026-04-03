import Cars from '../src/domain/Cars/Cars.js';
import TotalRound from '../src/domain/TotalRound/TotalRound.js';
import { parseAndTrim } from '../src/utils.js';

const CAR_NAMES_INPUT_SEPARATOR = ',';
const convertStringToArray = (input) =>
    parseAndTrim(input, CAR_NAMES_INPUT_SEPARATOR);
const convertStringToNumber = (input) => Number(input);

const alwaysMove = () => true;
const neverMove = () => false;

const playGame = (carNames, totalRound, moveStrategy) => {
    const totalRoundValue = TotalRound.of(totalRound);
    const cars = Cars.of(carNames);

    const roundSnapshots = [];
    for (let i = 0; i < totalRoundValue.value; i++) {
        cars.moveAll(moveStrategy);
        roundSnapshots.push(cars.snapshot);
    }

    return { roundSnapshots, winnerCarNames: cars.getWinnerNames() };
};

describe('입력 파싱 테스트', () => {
    describe('자동차 이름 문자열을 배열로 변환한다.', () => {
        it.each([
            { input: 'a,b,c', expected: ['a', 'b', 'c'] },
            { input: 'erica, ryang, yang', expected: ['erica', 'ryang', 'yang'] },
            { input: 'one', expected: ['one'] },
        ])('input: "$input" → $expected', ({ input, expected }) => {
            expect(convertStringToArray(input)).toEqual(expected);
        });
    });

    describe('라운드 수 문자열을 숫자로 변환한다.', () => {
        it.each([
            { input: '5', expected: 5 },
            { input: '1', expected: 1 },
            { input: '10', expected: 10 },
        ])('input: "$input" → $expected', ({ input, expected }) => {
            expect(convertStringToNumber(input)).toBe(expected);
        });
    });
});

describe('게임 실행 통합 테스트', () => {
    describe('정상 입력인 경우, 올바른 게임 결과를 반환한다.', () => {
        it('항상 전진하는 전략으로 3라운드 실행', () => {
            const carNames = ['erica', 'ryang'];
            const totalRound = 3;

            const { roundSnapshots, winnerCarNames } = playGame(
                carNames,
                totalRound,
                alwaysMove,
            );

            expect(roundSnapshots).toHaveLength(3);
            expect(roundSnapshots[2]).toEqual([
                { name: 'erica', position: 3 },
                { name: 'ryang', position: 3 },
            ]);
            expect(winnerCarNames).toEqual(['erica', 'ryang']);
        });

        it('항상 정지하는 전략으로 3라운드 실행', () => {
            const carNames = ['erica', 'ryang'];
            const totalRound = 3;

            const { roundSnapshots, winnerCarNames } = playGame(
                carNames,
                totalRound,
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

    describe('유효하지 않은 입력인 경우, 에러가 발생한다.', () => {
        it('자동차 이름이 5자를 초과하면 에러가 발생한다.', () => {
            expect(() => playGame(['ericaa'], 3, alwaysMove)).toThrow();
        });

        it('자동차 이름이 중복되면 에러가 발생한다.', () => {
            expect(() => playGame(['erica', 'erica'], 3, alwaysMove)).toThrow();
        });

        it('라운드 수가 범위를 벗어나면 에러가 발생한다.', () => {
            expect(() => playGame(['erica'], 0, alwaysMove)).toThrow();
            expect(() => playGame(['erica'], 11, alwaysMove)).toThrow();
        });

        it('라운드 수가 숫자가 아니면 에러가 발생한다.', () => {
            expect(() => playGame(['erica'], NaN, alwaysMove)).toThrow();
        });
    });
});

describe('라운드별 스냅샷 정합성 테스트', () => {
    it('각 라운드의 스냅샷은 누적 결과를 반영한다.', () => {
        const { roundSnapshots } = playGame(['erica'], 3, alwaysMove);

        expect(roundSnapshots[0]).toEqual([{ name: 'erica', position: 1 }]);
        expect(roundSnapshots[1]).toEqual([{ name: 'erica', position: 2 }]);
        expect(roundSnapshots[2]).toEqual([{ name: 'erica', position: 3 }]);
    });

    it('1라운드 실행 시, 스냅샷이 1개 생성된다.', () => {
        const { roundSnapshots } = playGame(['erica', 'ryang'], 1, alwaysMove);

        expect(roundSnapshots).toHaveLength(1);
        expect(roundSnapshots[0]).toEqual([
            { name: 'erica', position: 1 },
            { name: 'ryang', position: 1 },
        ]);
    });
});
