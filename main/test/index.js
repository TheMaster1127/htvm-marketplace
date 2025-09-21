// This is the main code file for the "String Reverser & Build Stamper" plugin.

console.log("HTVM Plugin 'String Reverser & Build Stamper' has been loaded.");

// --- HOOK 1: String Reversal (Runs Early) ---
/**
 * This hook runs early in the compilation process.
 * We use it for pre-processing and macro expansion.
 */
htvm_hook1 = function(code) {
    const reverseRegex = /REVERSE_STRING\s*\(\s*"(.*?)"\s*\)/g;

    const modifiedCode = code.replace(reverseRegex, (fullMatch, contentInsideQuotes) => {
        const reversedString = contentInsideQuotes.split('').reverse().join('');
        return `"${reversedString}"`;
    });

    return modifiedCode;
};


// --- HOOK 30: Build Timestamp (Runs Late) ---
/**
 * This hook runs at the very end of the compilation process,
 * right before the final code is returned.
 * It's perfect for adding final touches, like comments or metadata.
 * 
 * NOTE: The 'code' variable here is the code AFTER all other transpilation has happened.
 */
htvm_hook30 = function(code) {
    const timestamp = new Date().toISOString();
    const buildStampComment = `\n\n// This file was transpiled by HTVM with the 'Build Stamper' plugin on ${timestamp}`;
    
    // We simply append our comment to the end of the final code.
    const finalCode = code + buildStampComment;

    return finalCode;
};
