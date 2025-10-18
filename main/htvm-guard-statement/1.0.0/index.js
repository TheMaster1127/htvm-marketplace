/**
 * HTVM Plugin: Guard Statement
 * Redefines htvm_hook1 to transform custom 'guard' syntax into standard 'if' blocks.
 * This runs early in the transpilation pipeline, before the main logic parser.
 */
htvm_hook1 = function(code) {

    // Regex to find all lines starting with the 'guard' keyword.
    // It captures indentation, the condition, and the action.
    const guardRegex = /^(\s*)guard\s+(.+?)\s+else\s+(.+?)\s*$/gm;

    // Replace each found 'guard' statement with a standard, inverted 'if' block.
    const modifiedCode = code.replace(guardRegex, (fullMatch, indentation, condition, action) => {
        // Build the replacement string using the captured parts.
        // The resulting code is a standard HTVM 'if' statement that the engine already knows how to parse.
        return `${indentation}if (!(${condition})) {\n${indentation}    ${action};\n${indentation}}`;
    });

    // Return the modified code to the HTVM engine for further processing.
    return modifiedCode;
};