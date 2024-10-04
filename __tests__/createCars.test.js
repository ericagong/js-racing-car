import createCars from '../src/Models/Cars/createCars.js';
import {
    CarNamesNotStringError,
    CarNamesEmptyStringError,
    CarNamesDuplicatedError,
} from '../src/Models/Cars/errors.js';

describe('createCars() 테스트', () => {
    describe('CarNames 유효성 검사', () => {
        describe('carNames가 문자열 타입이 아닌 경우, 에러 발생', () => {
            it.each([1031, true, null, undefined, {}, [], function () {}])(
                'carNames: %p',
                (carNames) => {
                    expect(() => createCars(carNames)).toThrow(
                        CarNamesNotStringError,
                    );
                },
            );
        });

        describe('carNames가 빈 문자열인 경우, 에러 발생', () => {
            it.each(['', ' ', '   '])('carNames: "%s"', (carNames) => {
                expect(() => createCars(carNames)).toThrow(
                    CarNamesEmptyStringError,
                );
            });
        });

        describe('carNames에 중복된 자동차 이름이 존재하면, 에러를 발생시킨다.', () => {
            it.each([
                { carNames: 'erica,erica, ' },
                { carNames: 'gong0,gong0,Gong' },
                { carNames: '1031,1031' },
                { carNames: '*****,*****,**!**,***!*,*****' },
                { carNames: '*e*1C,*e*1C' },
                { carNames: ' , ' },
                { carNames: ',' },
            ])('$carNames', ({ carNames }) => {
                expect(() => createCars(carNames)).toThrow(
                    CarNamesDuplicatedError,
                );
            });
        });

        // TODO 내부에 car 이름 유효성 검사가 안맞으면 다른 에러 발생 가능
        // QUESTION: 이 경우에는 어떻게 처리해야할지?
        describe('carNames에 중복된 이름이 없으면, carNames 에러를 발생시키지 않는다.', () => {
            it.each([
                { carNames: 'erica,Erica' },
                { carNames: 'gong0,Gong0,1031,1031!,*****' },
                { carNames: '*e*1C,*e*1c,ERICA,Pan,theon' },
                { carNames: '!****,*!***,**!**,***!*,****!' },
            ])('$carNames', ({ carNames }) => {
                expect(() => createCars(carNames)).not.toThrow();
            });
        });
    });
});

// TODO 한 라운드 플레이하는 검증은 다른 곳으로 가야함
// describe('playOnce() 테스트', () => {
//     const cars = createCars(['erica', 'Erica', 'theon', 'yang', 'ryang']);
//     playOnce(cars, new MoveStrategies('12345'));

//     // TODO: 테스트 코드 가독성 개선 필요
//     it('Cars 배열 내 자동차들이 숫자가 4 이상이면 이동하고, 그렇지 않으면 이동하지 않는다.', () => {
//         expect(cars.map((car) => car.getRecord().position)).toEqual([
//             0, 0, 0, 1, 1,
//         ]);
//     });
// });

// describe('getRecord() 테스트', () => {
//     describe('Cars 내 모든 Car 정보를 반환한다.', () => {
//         it.each([
//             {
//                 carNames: ['erica', 'Erica'],
//                 expected: [
//                     { name: 'erica', position: 0 },
//                     { name: 'Erica', position: 0 },
//                 ],
//             },
//             {
//                 carNames: ['gong0', 'Gong0', '1031', '1031!', '*****'],
//                 expected: [
//                     { name: 'gong0', position: 0 },
//                     { name: 'Gong0', position: 0 },
//                     { name: '1031', position: 0 },
//                     { name: '1031!', position: 0 },
//                     { name: '*****', position: 0 },
//                 ],
//             },
//             {
//                 carNames: ['*e*1C', '*e*1c', 'ERICA', 'Pan', 'theon'],
//                 expected: [
//                     { name: '*e*1C', position: 0 },
//                     { name: '*e*1c', position: 0 },
//                     { name: 'ERICA', position: 0 },
//                     { name: 'Pan', position: 0 },
//                     { name: 'theon', position: 0 },
//                 ],
//             },
//         ])('$carNames', ({ carNames, expected }) => {
//             const cars = createCars(carNames);
//             const roundRecord = getRecord(cars);

//             expect(roundRecord).toEqual(expected);
//         });
//     });
// });
