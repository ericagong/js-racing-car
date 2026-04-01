export const isNumber = (target) => typeof target === 'number';
export const isString = (target) => typeof target === 'string';
export const isEmptyString = (target) => target.trim() === '';

export const parseAndTrim = (target, separator) => {
    return target.split(separator).map((item) => item.trim());
};
