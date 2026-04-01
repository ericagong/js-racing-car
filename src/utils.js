// 타입 검증
// target: Any
export const isNumber = (target) => typeof target === 'number';
export const isString = (target) => typeof target === 'string';
export const isFunction = (target) => typeof target === 'function';

// 빈 값 검증
export const isEmptyString = (target) => target.trim() === '';
export const isEmptyValue = (target) => {
    return (
        target === null ||
        target === undefined ||
        (isString(target) && isEmptyString(target))
    );
};
export const isEmptyArray = (target) => target.length === 0;

// 기타 검증
export const isPositive = (target) => target > 0;
export const hasSameLength = (target, length) => target.length === length;

// target : Array
export const parseAndTrim = (target, separator) => {
    return target.split(separator).map((item) => item.trim());
};
