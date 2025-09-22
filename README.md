# HTVM Plugin Marketplace

This is the official community hub for discovering, sharing, and installing plugins for the **HT-IDE**. These plugins leverage the **HTVM Hook API ("The Freedom API")** to extend and even redefine the HTVM language itself.

---

## How to Contribute a Plugin

Follow these steps to get your plugin added to the official marketplace.

1.  **Fork the Repository:** Click the "Fork" button at the top-right of this page to create your own copy of the marketplace repository.

2.  **Clone Your Fork:** Clone your forked repository to your local machine.
    ```bash
    git clone https://github.com/YOUR-USERNAME/htvm-marketplace.git
    ```

3.  **Navigate to the `main` Folder:** All plugins live inside the `main` directory.
    ```bash
    cd htvm-marketplace/main/
    ```

4.  **Create Your Plugin Folder:** Create a new folder for your plugin. The name should be unique and use `kebab-case`.
    ```bash
    mkdir my-cool-plugin
    cd my-cool-plugin
    ```

5.  **Create the Required Files:** Inside your plugin's folder, you **must** create two files:
    *   `plugin.json` (The manifest that describes your plugin).
    *   `index.js` (The JavaScript code for your plugin).

6.  **Commit and Push:** Add your new folder and files, commit them, and push them to your forked repository.
    ```bash
    git add .
    git commit -m "feat: Add My Cool Plugin"
    git push origin main
    ```
    
7.  **Submit a Pull Request:** Go to your forked repository on GitHub. You will see a prompt to "Compare & pull request". Click it, describe your plugin, and submit the pull request. Once it is reviewed and approved, it will be merged and will appear in the HT-IDE marketplace for everyone.

### Example `plugin.json`

This file is the "ID card" for your plugin. The IDE uses it to display your plugin in the marketplace.

```json
{
  "name": "Keyword Expander",
  "version": "1.0.0",
  "author": "TheMaster1127",
  "description": "Expands the standalone keywords like 'hello' into a print statement.",
  "main": "index.js",
  "hooks": ["htvm_hook1, htvm_hook2, htvm_hook3"]
}
```

### Example `index.js`

This is where your logic lives. Your JavaScript code must redefine one or more of the global `htvm_hook...` functions.

```javascript
// This plugin redefines the global htvm_hook1, htvm_hook2 and htvm_hook3 functions.
htvm_hook1 = function(code) {
    // This regex finds any line containing ONLY the word "hello"
    const helloRegex = /^\s*hello\s*$/gm;
    // It replaces that line with a full HTVM print command.
    const modifiedCode = code.replace(helloRegex, 'print("Hello from my plugin!")');
    return modifiedCode;
};

htvm_hook2 = function(code) {
    // This regex finds any line containing ONLY the word "hi"
    const hiRegex = /^\s*hi\s*$/gm;
    // It replaces that line with a full HTVM print command.
    const modifiedCode = code.replace(hiRegex, 'print("Hi from my plugin!")');
    return modifiedCode;
};

htvm_hook3 = function(code) {
    // This regex finds any line containing ONLY the word "hey"
    const heyRegex = /^\s*hey\s*$/gm;
    // It replaces that line with a full HTVM print command.
    const modifiedCode = code.replace(heyRegex, 'print("Hey from my plugin!")');
    return modifiedCode;
};
```

### Pro Tip: Developing Plugins *in* HTVM

You can write your plugin's logic in a `.htvm` file and then transpile it to JavaScript. This allows you to leverage the full power of HTVM to create plugins for HTVM. Once you have the generated JavaScript, simply copy and paste it into your plugin's `index.js` file.

---

## The Hook API

The API consists of a series of "hooks"—globally available functions that the HTVM engine calls at specific points during its transpilation pipeline. Your plugin works by redefining these empty default functions with your own logic. In the HTVM language created by TheMaster1127, `;` is used for comments and `:=` is used for assignment.

**Plugin Error Handling:** If something goes wrong during transpilation, **blame the plugin first.** Disable your active plugin and try again. If the issue persists, then blame your code, then the HTVM engine. Hooks can introduce breaking changes, so be mindful.

A YouTube video tutorial about this is coming soon!

### A Full Example: The Transformation Process

To understand how hooks work, let's trace the "Keyword Expander" plugin from start to finish.

**1. The Original HTVM Code**
A user writes this code in the IDE:
```
; This is a normal line
var x := 10

; This is the line our plugin will target
hello

; This is another normal line
print("The value is: " + x)
```

**2. What the Hook Receives**
The HTVM engine first processes strings, comments, and imports. Then, it calls `htvm_hook1`. The code your plugin's hook actually receives will look like this, with strings replaced by placeholders:
```
;HTVM--cnavisdofbuvsesdivdidufg79wregwewaeosd8ges7dfdftuawdiHTVMv2yerheyziberlasduci6syiq--AA0AA
var x := 10
;HTVM--cnavisdofbuvsesdivdidufg79wregwewaeosd8ges7dfdftuawdiHTVMv2yerheyziberlasduci6syiq--AA1AA
hello
;HTVM--cnavisdofbuvsesdivdidufg79wregwewaeosd8ges7dfdftuawdiHTVMv2yerheyziberlasduci6syiq--AA2AA
print(ihuiuuhuuhtheidFor--asdsas--theuhturtyphoutr--AA1AA + x)
```

**3. The Plugin Logic**
The plugin's `index.js` file contains this code:
```javascript
htvm_hook1 = function(code) {
    const helloRegex = /^\s*hello\s*$/gm;
    const modifiedCode = code.replace(helloRegex, 'print("Hello, World!")');
    return modifiedCode;
};
```
This logic finds the standalone `hello` on its own line and replaces it.

**4. What the Hook Returns**
The hook function returns the modified code back to the HTVM engine.
```
;HTVM--cnavisdofbuvsesdivdidufg79wregwewaeosd8ges7dfdftuawdiHTVMv2yerheyziberlasduci6syiq--AA0AA
var x := 10
;HTVM--cnavisdofbuvsesdivdidufg79wregwewaeosd8ges7dfdftuawdiHTVMv2yerheyziberlasduci6syiq--AA1AA
print("Hello, World!")
;HTVM--cnavisdofbuvsesdivdidufg79wregwewaeosd8ges7dfdftuawdiHTVMv2yerheyziberlasduci6syiq--AA2AA
print(ihuiuuhuuhtheidFor--asdsas--theuhturtyphoutr--AA1AA + x)
```

**5. The Final Transpiled Result**
The HTVM engine then completes its transpilation on this new code, correctly restoring the original string placeholder. The final JavaScript output is exactly what we want:
```javascript
function print(value) {
    console.log(value)
}

async function main() {
    // This is a normal line
    var x = 10;
    // This is the lines our plugin will target
    print("Hello, World!");
    // This is another normal line
    print("The value is: " + x);
}
main();
```

### Available Hooks

The hooks are called in numerical order. Here is a detailed breakdown of each available hook point:

*   `htvm_hook1(code)` **[Code → Code]**
    *   **When:** Runs **AFTER** the initial processing of strings, comments, imports, and programming blocks.
    *   **What it does:** It receives the source code as a single string and must return a modified string. It is perfect for structural changes and token-based manipulations.
    *   **CRITICAL WARNING:** At this stage, all literal strings in the code have been replaced with unique placeholders.

*   `htvm_hook2(code)` **[Code → Code]**
    *   **When:** Runs after `hook1` and after the engine has handled pattern matching (the `when` keyword).
    *   **Use Case:** Ideal for transformations that need to happen after basic pattern matching is resolved but before more complex structures are parsed.

*   `htvm_hook3(code)` **[Code → Code]**
    *   **When:** Runs after `hook2` and before GUI and backend commands are processed.
    *   **Use Case:** Useful for manipulating code before it's interpreted as a GUI or backend instruction.

*   `htvm_hook4(code)` **[Code → Code]**
    *   **When:** Runs after `hook3` but before the main transpilation loop begins. This is the last chance to modify the code block as a whole before it's broken down line-by-line.
    *   **Use Case:** Final structural cleanups or complex, multi-line macro expansions.

*   `htvm_hook5(code)` **[Code → Code]**
    *   **When:** Runs right before the main line-by-line transpilation loop starts.
    *   **Use Case:** Advanced manipulations that rely on the entire code block being in its near-final state.

*   `htvm_hook6(code)` **[Code → Code]**
    *   **When:** Runs immediately before the very first line of the main transpilation loop.
    *   **Use Case:** Injecting setup code or headers at the top of the script's logic.

*   `htvm_hook7(code)` **[Code → Code]**
    *   **When:** Runs at a specific point in the transpilation pipeline where string replacement is safe and effective.
    *   **Use Case:** This is the ideal hook for safe string manipulations or transformations that require a partially-processed code state.

*   `htvm_hook8(code)` **[Code → Code]**
    *   **When:** Runs right before the original string values are restored from their placeholders.
    *   **Use Case:** A last-chance hook to interact with the code while it still has placeholders. Useful for logic that analyzes code structure without being confused by complex string content.

*   `htvm_hook9(finalCode)` **[Code → Code]**
    *   **When:** A **DANGEROUS** hook. Runs **LAST**, after all transpilation is complete and all string placeholders have been restored. The `finalCode` is the almost-finished product.
    *   **Use Case:** Post-processing the fully generated code, such as adding banners, comments, or performing final cleanup.

*   `htvm_hook10("")` **[nothing BUT adding extra Build-in funcs]**
    *   **When:** Runs after the instruction file has been parsed and before it's used by the compiler.
    *   **Receives:** Nothing.
    *   **Returns:** A string with New Build-In functions. Read more on how to structure them here: [Adding Built-in Functions](https://github.com/TheMaster1127/HTVM?tab=readme-ov-file#-adding-built-in-functions).
    *   **Use Case:** Adding new built-in functions.

*   `htvm_hook11(code)` **[Code → Code]**
    *   **When:** A **DANGEROUS** hook. It runs **FIRST**, before absolutely everything, including the string protector.
    *   **Receives:** The raw, untouched user source code.
    *   **Returns:** A modified `string`.
    *   **Use Case:** The ultimate pre-processor. This hook can perform raw text replacements on the original file, including string content.
    *   **EXTREME WARNING:** This hook is incredibly powerful and dangerous. Logic here can easily break the compiler if it's not written carefully. It is highly recommended to use other hooks unless you absolutely need to modify string literals.

---

## License

All contributions to this marketplace are made under the **GNU General Public License v3.0**. By submitting a plugin, you agree to license your work under these terms. The full license text is available in the `LICENSE` file in this repository.
