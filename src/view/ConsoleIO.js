import readline from 'readline';

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export const readLine = (prompt) => {
    return new Promise((resolve) => {
        readlineInterface.question(prompt, resolve);
    });
};

export const printLine = (text = '') => console.log(text);

export const close = () => {
    readlineInterface.close();
};
