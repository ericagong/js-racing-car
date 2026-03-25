import createConsoleReader from './consoleReader';
import createConsoleWritter from './consoleWritter';

export default function createView() {
    const inputReader = createConsoleReader();
    const outputPrinter = createConsoleWritter();

    return {
        addEventHandlerToInputReader: inputReader.addEventHandler,
        closeInputReader: inputReader.close,
        printGameResult: outputPrinter.gameResultTemplate,
        printErrorMessage: outputPrinter.errorMessageTemplate,
    };
}
