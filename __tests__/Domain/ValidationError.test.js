import DomainError from '../../src/Domain/DomainError.js';

describe('getMessage() 테스트', () => {
    describe('message를 반환한다.', () => {
        it.each(['', ' ', 'message', 'Long message like this....!!'])(
            '%p',
            (message) => {
                const error = new DomainError(message);
                expect(error.getMessage()).toBe(message);
            },
        );
    });
});
