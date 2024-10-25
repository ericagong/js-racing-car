import { addEventHandler, close } from './consoleReader.js';
import { gameResultTemplate, errorMessageTemplate } from './consoleWritter.js';

const View = {
    addEventHandlerToInputReader: addEventHandler,
    closeInputReader: close,
    printGameResult: gameResultTemplate,
    printErrorMessage: errorMessageTemplate,
};

export default View;
