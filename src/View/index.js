import { addEventHandler, close } from './consoleReader.js';
import { gameResultTemplate, errorMessageTemplate } from './consoleWritter.js';

const View = {
    onInput: addEventHandler,
    close: close,
    printGameResult: gameResultTemplate,
    printErrorMessage: errorMessageTemplate,
};

export default View;
