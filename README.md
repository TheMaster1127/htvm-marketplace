# HTVM Plugin Marketplace

This is the official community hub for discovering, sharing, and installing plugins for the **HT-IDE**. These plugins leverage the **HTVM Hook API ("The Freedom API")** to extend and even redefine the HTVM language itself.

---

## ⚠️ **WARNING: This is a Cutting-Edge, In-Development Feature** ⚠️

> The HTVM Plugin API is a powerful but highly advanced feature. It is still under active development. Hooks may change, and the system is intended for developers who understand the core concepts of HTVM. Use at your own risk. This is a guide, not a guarantee.

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
  "description": "Expands the standalone keyword 'hello' into a print statement.",
  "main": "index.js",
  "hooks": ["htvm_hook1"]
}
```

### Pro Tip: Developing Plugins *in* HTVM

You can write your plugin's logic in a `.htvm` file and then transpile it to JavaScript. This allows you to leverage the full power of HTVM to create plugins for HTVM. Once you have the generated JavaScript, simply copy and paste it into your plugin's `index.js` file.

---

## The Hook API

The API consists of a series of "hooks"—globally available functions that the HTVM engine calls at specific points during the transpilation process. Your plugin works by replacing these empty default functions with your own logic.

A YouTube video tutorial about this is coming soon!

### A Full Example: The Transformation Process

To understand how hooks work, let's trace the "Keyword Expander" plugin from start to finish. In the HTVM language, we use `;` for comments and `:=` for assignment.

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
The HTVM engine first processes strings, comments, and imports for security and stability. Then, it calls `htvm_hook1`. The code your plugin's hook actually receives will look like this, with strings replaced by placeholders:
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
This logic finds the standalone `hello` on its onw line and replaces it.

**4. What the Hook Returns**
The hook function returns the modified code back to the HTVM engine. Notice that the string placeholder from the original `print` statement is untouched.
```
; This is a normal line
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

### Pro Tip: Developing Plugins *in* HTVM

You can write your plugin's logic in a `.htvm` file and then transpile it to JavaScript. This allows you to leverage the full power of HTVM to create plugins for HTVM. Once you have the generated JavaScript, simply copy and paste it into your plugin's `index.js` file.

---

## The Hook API

The API consists of a series of "hooks"—globally available functions that the HTVM engine calls at specific points during the transpilation process. Your plugin works by replacing these empty default functions with your own logic.

A YouTube video tutorial about this is coming soon!

### Available Hooks

**For now, there is only one hook.** More will be added as the API matures.

*   `htvm_hook1(code)`
    *   **When it runs:** This hook runs **AFTER** the initial processing of strings, comments, imports, and programming blocks.
    *   **What it does:** It receives the source code as a single string and must return a modified string. It is perfect for structural changes and token-based manipulations.
    *   **CRITICAL WARNING:** At this stage, all literal strings in the code have been replaced with unique placeholders. The code you receive will look like this:
        ```
        my_text = REVERSE_STRING(ihuiuuhuuhtheidFor--asdsas--theuhturtyphoutr--AA1AA)
        ```
        Your plugin logic **cannot** operate on the content of strings. It can only operate on the surrounding code structure, keywords, and variable names.

> More hooks will be added in the future. Stay tuned!

---

## License

All contributions to this marketplace are made under the **GNU General Public License v3.0**. By submitting a plugin, you agree to license your work under these terms. The full license text is available in the `LICENSE` file in this repository.
