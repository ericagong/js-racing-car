import generateRandomNumber from '../../../src/Models/MoveStrategy/RandomNumberStrategy/generateRandomNumber.js';

describe('generateNumber() 테스트', () => {
    describe('[min, max] 사이의 값을 반환한다.', () => {
        it.each([
            { min: -100, max: -99 },
            { min: -1, max: 0 },
            { min: -1, max: 1 },
            { min: 1, max: 100 },
        ])('min: $min, max: $max', ({ min, max }) => {
            const number = generateRandomNumber(min, max);
            expect(number).toBeGreaterThanOrEqual(min);
            expect(number).toBeLessThanOrEqual(max);
        });
    });
});
