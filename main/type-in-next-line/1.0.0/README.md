# "Type on the next line" Plugin for HTVM

Ever thought, "I wish I could declare my variable's type on the line *after* I've assigned its value"? Probably not, but with HTVM's Freedom API, the question isn't "why?"—it's **"why not?"**

This plugin introduces a fun and unconventional way to declare variable types, demonstrating the ultimate syntactic freedom of HTVM.

---

## Features

This plugin uses `htvm_hook1` to scan your code for a specific two-line pattern: a variable assignment followed immediately by a line containing only a type keyword. It then merges these two lines into a standard, single-line variable declaration.

### Before (in your `.htvm` file):
```htvm
; A new, quirky way to declare a variable
username = "TheMaster1127"
str

user_id = 9001
int
```

### After (what the HTVM compiler receives):
```htvm
; The plugin automatically transforms the lines above into this:
str username = "TheMaster1127"
int user_id = 9001
```

## How It Works

The plugin's logic in `index.js` uses a multiline regular expression to find variable assignments that are immediately followed by a type declaration on the next line. It then rewrites this pattern into the standard declaration format *before* the main HTVM compiler begins its work.

## Key Points & Usage

*   **Completely Optional:** This is just an alternative syntax! You can still declare variables the normal way (`int myVar = 10;`). The plugin won't interfere with standard declarations. You can mix and match both styles in the same file.
*   **Works With Any Type:** This syntax works for all HTVM types: `int`, `str`, `bool`, `float`, `int64`, custom types, etc.
*   **Strict Formatting:** The type **must** be on the line immediately following the assignment, and that line can contain **only the type keyword** (with optional whitespace).

## Installation

You can install this plugin through the **Plugin Manager** in the HT-IDE.

1.  Click on the `Plugins` button in the sidebar.
2.  Navigate to the "Marketplace" tab.
3.  Find the "Type on the next line" plugin and click "Install".
4.  Activate the plugin using the checkbox in the "Installed" tab.
5.  Enjoy declaring your types in a whole new way!