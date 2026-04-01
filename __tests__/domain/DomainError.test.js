import DomainError from '../../src/domain/DomainError.js';

describe('message 테스트', () => {
    describe('message를 반환한다.', () => {
        it.each(['', ' ', 'message', 'Long message like this....!!'])(
            'message: %p',
            (message) => {
                const error = new DomainError(message);
                expect(error.message).toBe(message);
            },
        );
    });
});
