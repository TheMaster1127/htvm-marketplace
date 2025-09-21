# Test Plugin for HTVM

This is a simple test plugin for the HTVM Hook API. Its purpose is to demonstrate the basic functionality of the plugin system and serve as a starting point for new plugin developers.

---

## Features

This plugin uses `htvm_hook1` to perform a simple macro expansion. It finds any line in your `.htvm` code that contains only the keyword `hello` and replaces it with a full print statement.

### Before (in your `.htvm` file):
```htvm
; The plugin will find and replace the next line
hello
```

### After (what the compiler receives):
```htvm
; The plugin will find and replace the next line
print("Hello from the HTVM Test Plugin!")
```

## How It Works

The plugin's logic is contained in `index.js`. It uses a regular expression to find the standalone `hello` keyword at the beginning and end of a line, ensuring it doesn't accidentally replace the word if it appears as part of another command.

This demonstrates the power of `htvm_hook1`, which runs as a pre-processor on your raw code *before* the main HTVM transpiler does its work.

## Installation

You can install this plugin through the **Plugin Manager** in the HT-IDE.

1.  Open the Plugin Manager.
2.  Navigate to the "Marketplace" tab.
3.  Find "Test Plugin" in the list and click "Install".
4.  Go to the "Installed" tab, find "Test Plugin", and click "Activate".
5.  The IDE will reload, and the plugin will be active.
