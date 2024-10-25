import MoveStrategy from '../../src/Models/entities/MoveStrategy/MoveStrategy.js';
import validateMoveStrategies from '../../src/Models/service/MoveStrategies/validateMoveStrategies.js';
import {
    MoveStrategiesNotArrayError,
    MoveStrategiesElementNotMoveStrategyError,
    MoveStrategiesLengthError,
} from '../../src/Models/service/MoveStrategies/errors.js';
import { getRandomNumberStrategy } from '../../src/Models/service/MoveStrategies/getMoveStrategies.js';

describe('validateMoveStrategies(moveStrategies, carsCount) 유효성 검증 테스트', () => {
    const anyMoveStrategy = new MoveStrategy(
        () => true,
        () => 5,
        1,
    );

    describe('유효하지 않은 경우, 에러가 발생한다.', () => {
        describe('moveStrategies가 배열이 아닌 경우', () => {
            it.each([1031, true, null, undefined, {}, function () {}])(
                '%p',
                (moveStrategies) => {
                    expect(() =>
                        validateMoveStrategies(moveStrategies, 1),
                    ).toThrow(MoveStrategiesNotArrayError);
                },
            );
        });

        describe('moveStrategies의 요소 중 MoveStrategy가 아닌 요소가 존재하는 경우', () => {
            it.each([
                {
                    moveStrategies: [1031],
                },
                { moveStrategies: [true] },
                { moveStrategies: [null] },
                { moveStrategies: [undefined] },
                { moveStrategies: [{}] },
                { moveStrategies: [function () {}] },
            ])('%p', ({ moveStrategies }) => {
                expect(() => validateMoveStrategies(moveStrategies, 3)).toThrow(
                    MoveStrategiesElementNotMoveStrategyError,
                );
            });
        });

        describe('moveStrategies 길이와 carNames 길이가 같지 않은 경우', () => {
            it('moveStrategies 길이 < carNames 길이', () => {
                const moveStrategies = [anyMoveStrategy, anyMoveStrategy];
                expect(() => validateMoveStrategies(moveStrategies, 3)).toThrow(
                    MoveStrategiesLengthError,
                );
            });

            it('moveStrategies 길이 > carNames 길이', () => {
                const moveStrategies = [
                    anyMoveStrategy,
                    anyMoveStrategy,
                    anyMoveStrategy,
                    anyMoveStrategy,
                ];
                expect(() => validateMoveStrategies(moveStrategies, 3)).toThrow(
                    MoveStrategiesLengthError,
                );
            });
        });
    });

    describe('유효한 경우, 에러가 발생하지 않는다.', () => {
        it('moveStrategies가 carsCount 길이의 MoveStrategy로 요소가 구성된 array 타입인 경우', () => {
            const moveStrategies = [
                anyMoveStrategy,
                anyMoveStrategy,
                anyMoveStrategy,
            ];
            expect(() =>
                validateMoveStrategies(moveStrategies, 3),
            ).not.toThrow();
        });
    });
});

describe('getRandomNumberStrategy() 테스트', () => {
    it('랜덤 숫자를 반환하는 MoveStrategy 객체를 반환한다.', () => {
        const randomNumberStrategy = getRandomNumberStrategy();
        const expected = new MoveStrategy(
            (number) => number >= 4,
            () => Math.floor(Math.random() * (9 - 0 + 1)) + 0,
            1,
        );
        expect(randomNumberStrategy).toEqual(expected);
    });
});
