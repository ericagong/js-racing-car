import CarName from '../src/Models/CarName/CarName.js';
import {
    CarNameNotStringError,
    CarNameEmptyError,
    CarNameTooLongError,
} from '../src/Models/CarName/errors.js';

describe('CarName 생성자 테스트', () => {
    describe('name 유효성 검사 테스트', () => {
        describe('name가 문자열 타입이 아닌 경우, 에러 발생', () => {
            it.each([1031, true, null, undefined, {}, [], function () {}])(
                'name: %p',
                (name) => {
                    expect(() => new CarName(name)).toThrow(
                        CarNameNotStringError,
                    );
                },
            );
        });

        describe('name가 빈 값인 경우, 에러 발생', () => {
            it.each(['', ' ', '   '])('name: "%s"', (name) => {
                expect(() => new CarName(name)).toThrow(CarNameEmptyError);
            });
        });

        describe('name가 5자 초과인 경우, 에러 발생', () => {
            it.each(['erica0', 'ericaGong', '*****!', '951031'])(
                'name: "%s"',
                (name) => {
                    expect(() => new CarName(name)).toThrow(
                        CarNameTooLongError,
                    );
                },
            );
        });

        describe('name가 1자 이상 5자 이하 문자열이면, 오류를 발생시키지 않음', () => {
            it.each(['a', '12', '13a', 'eric*', 'erica'])(
                'name: "%s"',
                (validname) => {
                    expect(() => new CarName(validname)).not.toThrow();
                },
            );
        });
    });

    describe('생성자 내부 로직 테스트', () => {
        describe('name를 상태로 하는 Name 객체를 생성합니다.', () => {
            it.each([{ name: 'erica' }, { name: 'gong' }])(
                'name: $name',
                ({ name }) => {
                    const carName = new CarName(name);
                    expect(carName).toBeInstanceOf(CarName);
                    expect(carName.name).toEqual(name);
                },
            );
        });
    });
});

describe('of() 테스트', () => {
    it('Name 인스턴스를 반환합니다.', () => {
        expect(CarName.of('erica')).toBeInstanceOf(CarName);
    });
});

describe('get name() 테스트', () => {
    it('Name 객체의 name를 반환합니다.', () => {
        const name = CarName.of('erica');
        expect(name.name).toBe('erica');
    });
});
