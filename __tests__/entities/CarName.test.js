import CarName from '../../src/Models/entities/CarName/CarName.js';
import {
    CarNameNotStringError,
    CarNameEmptyError,
    CarNameTooLongError,
} from '../../src/Models/entities/CarName/errors.js';

describe('static of(value) 테스트', () => {
    it('CarName 인스턴스를 반환한다.', () => {
        expect(CarName.of('erica')).toBeInstanceOf(CarName);
    });
});

describe('new CarName(value) 테스트', () => {
    describe('value 유효성 검사 테스트', () => {
        describe('value가 문자열 타입이 아닌 경우, 에러 발생', () => {
            it.each([1031, true, null, undefined, {}, [], function () {}])(
                'value: %p',
                (value) => {
                    expect(() => new CarName(value)).toThrow(
                        CarNameNotStringError,
                    );
                },
            );
        });

        describe('value가 빈 값인 경우, 에러 발생', () => {
            it.each(['', ' ', '   '])('value: "%s"', (value) => {
                expect(() => new CarName(value)).toThrow(CarNameEmptyError);
            });
        });

        describe('value가 5자 초과인 경우, 에러 발생', () => {
            it.each(['erica0', 'ericaGong', '*****!', '951031'])(
                'value: "%s"',
                (value) => {
                    expect(() => new CarName(value)).toThrow(
                        CarNameTooLongError,
                    );
                },
            );
        });

        describe('value가 1자 이상 5자 이하 문자열이면, 오류를 발생시키지 않음', () => {
            it.each(['a', '12', '13a', 'eric*', 'erica'])(
                'value: "%s"',
                (validvalue) => {
                    expect(() => new CarName(validvalue)).not.toThrow();
                },
            );
        });
    });

    describe('생성자 내부 로직 테스트', () => {
        describe('value를 상태로 하는 Name 객체를 생성합니다.', () => {
            it.each([{ value: 'erica' }, { value: 'gong' }])(
                'value: $value',
                ({ value }) => {
                    const carName = new CarName(value);
                    expect(carName).toBeInstanceOf(CarName);
                    expect(carName.value).toEqual(value);
                },
            );
        });
    });
});

describe('get value 테스트', () => {
    it('Name 객체의 value를 반환한다.', () => {
        const carName = CarName.of('erica');
        expect(carName.value).toBe('erica');
    });
});
