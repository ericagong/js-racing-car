import MoveStrategies from '../../src/Models/service/MoveStrategies/index.js';
import MoveStrategy from '../../src/Models/entities/MoveStrategy/MoveStrategy.js';
import {
    MoveStrategiesNotArrayError,
    MoveStrategiesElementNotMoveStrategyError,
    MoveStrategiesLengthError,
} from '../../src/Models/service/MoveStrategies/errors.js';

const { validateMoveStrategies } = MoveStrategies;

describe('validateMoveStrategies(moveStrategies, carsCount) 유효성 검증 테스트', () => {
    const anyMoveStrategy = new MoveStrategy(
        () => true,
        () => 5,
        1,
    );

    describe('유효하지 않은 경우, 에러가 발생한다.', () => {
        describe('moveStrategies가 Array 타입이 아닌 경우', () => {
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

        describe('moveStrategies 길이와 count 길이가 같지 않은 경우', () => {
            it('moveStrategies 길이 < count 길이', () => {
                const moveStrategies = [anyMoveStrategy, anyMoveStrategy];
                expect(() => validateMoveStrategies(moveStrategies, 3)).toThrow(
                    MoveStrategiesLengthError,
                );
            });

            it('moveStrategies 길이 > count 길이', () => {
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
        it('moveStrategies가 count 길이의 MoveStrategy로 요소가 구성된 Array 타입인 경우', () => {
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
