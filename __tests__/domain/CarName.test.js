import CarName from '../../src/domain/CarName/CarName.js';
import {
    ValueNotStringError,
    ValueEmptyStringError,
    ValueLengthTooLongError,
} from '../../src/domain/CarName/errors.js';

describe('static of(value) 테스트', () => {
    it('value로 생성한 CarName 인스턴스를 반환한다.', () => {
        const value = 'erica';
        expect(CarName.of(value)).toEqual(new CarName(value));
    });
});

describe('new CarName(value) 테스트', () => {
    describe('value 유효성 검사 테스트', () => {
        describe('value가 유효하지 않은 경우, 에러가 발생한다.', () => {
            describe('value가 문자열 타입이 아닌 경우', () => {
                it.each([1031, true, null, undefined, {}, [], function () {}])(
                    'value: %p',
                    (value) => {
                        expect(() => new CarName(value)).toThrow(
                            ValueNotStringError,
                        );
                    },
                );
            });

            describe('value가 빈 값인 경우', () => {
                it.each(['', ' ', '   '])('value: "%s"', (value) => {
                    expect(() => new CarName(value)).toThrow(
                        ValueEmptyStringError,
                    );
                });
            });

            describe('value가 5자 초과인 경우', () => {
                it.each(['erica0', 'ericaGong', '*****!', '951031'])(
                    'value: "%s"',
                    (value) => {
                        expect(() => new CarName(value)).toThrow(
                            ValueLengthTooLongError,
                        );
                    },
                );
            });
        });

        describe('value가 1자 이상 5자 이하 문자열이면, 에러가 발생하지 않는다.', () => {
            it.each(['a', '12', '13a', 'eric*', 'erica'])(
                'value: "%s"',
                (validvalue) => {
                    expect(() => new CarName(validvalue)).not.toThrow();
                },
            );
        });
    });

    describe('생성자 내부 로직 테스트', () => {
        describe('value의 좌우 공백을 제거한 값을 value로 갖는 Name 객체를 생성합니다.', () => {
            it.each([
                { value: '   erica   ', expected: CarName.of('erica') },
                { value: '  gong', expected: CarName.of('gong') },
            ])('value: $value', ({ value, expected }) => {
                expect(new CarName(value)).toEqual(expected);
            });
        });
    });
});

describe('get value 테스트', () => {
    describe('value를 반환한다.', () => {
        it.each([
            { value: 'erica  ', expected: 'erica' },
            { value: '   gong', expected: 'gong' },
        ])('value: $value', ({ value, expected }) => {
            const carName = CarName.of(value);
            expect(carName.value).toBe(expected);
        });
    });
});
