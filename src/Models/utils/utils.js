// target: Any
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

// target : Array
export const parseAndTrim = (target, separator) => {
    return target.split(separator).map((item) => item.trim());
};
export const hasSameLength = (target, length) => target.length === length;
