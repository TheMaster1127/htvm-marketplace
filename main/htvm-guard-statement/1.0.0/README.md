# Guard Statement Plugin for HTVM

Introduces a powerful `guard` statement, inspired by Swift, to make validation and early-exit logic cleaner and more readable in your HTVM code.

---

## Features

This plugin uses `htvm_hook1` to transform a simple, one-line `guard` statement into a standard HTVM `if` block. This allows you to check for preconditions at the start of a function and exit early if they are not met, avoiding nested `if` statements (the "pyramid of doom").

### Before (in your `.htvm` file):
```htvm
func void processPayment(int amount, bool userIsVerified) {
    ; Check preconditions before running the main logic
    guard amount > 0 else return
    guard userIsVerified == true else print("Error: User not verified!") return
    
    ; This is the "happy path" - it only runs if all guards pass.
    print("Processing payment of $" . amount)
    ; ... more logic here
}
```

### After (what the HTVM compiler receives):
```htvm
func void processPayment(int amount, bool userIsVerified) {
    ; Check preconditions before running the main logic
    if (!(amount > 0)) {
        return;
    }
    if (!(userIsVerified == true)) {
        print("Error: User not verified!");
        return;
    }
    
    ; This is the "happy path" - it only runs if all guards pass.
    print("Processing payment of $" . amount)
    ; ... more logic here
}
```

## How It Works

The plugin's logic is contained in `index.js`. It uses a regular expression to find any line starting with the `guard` keyword, captures the condition and the `else` action, and replaces it with a standard, inverted `if` block that the HTVM compiler already understands.

This happens entirely during the pre-processing stage, making the new syntax feel native to the language.

## Why Use `guard`?

*   **Reduces Nesting:** It keeps your validation checks flat instead of deeply nested inside `if` statements.
*   **Improves Readability:** The main, successful execution path of your function (the "happy path") remains at the lowest level of indentation, making the code's primary purpose easier to follow.
*   **Clearer Intent:** The `guard` keyword makes it explicit that you are defining a precondition that *must* be true for the function to continue.

## Installation

You can install this plugin through the **Plugin Manager** in the HT-IDE.

1.  Click on the `Plugins` button in the sidebar.
2.  Navigate to the "Marketplace" tab.
3.  Find the "Guard Statement" plugin in the list and click "Install".
4.  Activate the plugin using the checkbox in the "Installed" tab.
5.  The IDE will reload, and the `guard` syntax will be available in your `.htvm` files.
