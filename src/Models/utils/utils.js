export const isNumber = (target) => typeof target === 'number';

export const isString = (target) => typeof target === 'string';
export const isFunction = (target) => typeof target === 'function';

export const isEmptyString = (target) => target.trim() === '';
export const isEmptyValue = (target) => {
    return (
        target === null ||
        target === undefined ||
        (isString(target) && isEmptyString(target))
    );
};

export const splitAndTrim = (target, separator) =>
    target.split(separator).map((str) => str.trim());
