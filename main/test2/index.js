// HTVM Plugin: Keyword Expander - index.js

console.log("HTVM Plugin 'Keyword Expander' has been loaded.");

/**
 * This hook finds lines containing only the word 'hello2' and expands them
 * into a full print statement. This is a perfect example of a macro.
 * 
 * @param {string} code The entire source code of the .htvm file as a string.
 * @returns {string} The modified source code.
 */
htvm_hook1 = function(code) {
    // This Regular Expression is the key. Let's break it down:
    // ^      - Asserts the start of a line.
    // \s*    - Matches any whitespace (spaces, tabs) zero or more times.
    // hello2  - Matches the literal word "hello2".
    // \s*    - Matches any whitespace after the word.
    // $      - Asserts the end of a line.
    // /gm    - g: global (replace all occurrences), m: multiline (so ^ and $ work on each line).
    const helloRegex = /^\s*hello2\s*$/gm;

    // We replace every line that matches this pattern with the new print statement.
    const modifiedCode = code.replace(helloRegex, 'print("Hello2 from the HTVM Test Plugin!")');

    return modifiedCode;
};
