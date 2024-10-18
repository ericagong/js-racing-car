import { isNumber } from '../Models/utils/utils';
import {
    MinMaxNumberNotNumberError,
    MinNumberGreaterThanMaxNumberError,
} from './errors';

export default function generateRandomNumber(min, max) {
    if (!isNumber(min) || !isNumber(max))
        throw new MinMaxNumberNotNumberError();
    if (min > max) throw new MinNumberGreaterThanMaxNumberError();
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
