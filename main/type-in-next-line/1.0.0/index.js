



function LoopParseFunc(varString, delimiter1="", delimiter2="") {
    let items;
    if (!delimiter1 && !delimiter2) {
        // If no delimiters are provided, return an array of characters
        items = [...varString];
    } else {
        // Construct the regular expression pattern for splitting the string
        let pattern = new RegExp('[' + delimiter1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + delimiter2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ']+');
        // Split the string using the constructed pattern
        items = varString.split(pattern);
    }
    return items;
}

function Chr(number) {
    // Return the character corresponding to the Unicode code point, or an empty string if out of range
    return (number >= 0 && number <= 0x10FFFF) ? String.fromCharCode(number) : "";
}

function Trim(inputString) {
    return inputString ? inputString.trim() : "";
}

function StringTrimRight(input, numChars) {
    return (numChars <= input.length) ? input.substring(0, input.length - numChars) : input;
}

function HTVM_Append(arr, value) {
    arr.push(value);
}


function anyType(line) {
    if (Trim(line) == Trim(keyWordVoid)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordINT64)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordINT32)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordINT16)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordINT8)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordFLOAT)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordBOOL)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordSTR)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordINT)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordUint64)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordUint32)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordUint16)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordUint8)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordChar)) {
        return true;
    }
    else if (Trim(line) == Trim(keyWordDouble)) {
        return true;
    }
    return false;
}

htvm_hook1 = function(code) {
    let modifiedCode = "";


    let later = [];
    let items1 = LoopParseFunc(code, "\n", "\r");
    for (let A_Index1 = 0; A_Index1 < items1.length; A_Index1++) {
        const A_LoopField1 = items1[A_Index1 - 0];
        HTVM_Append(later, A_LoopField1);
    }
    HTVM_Append(later, "");
    var skip = 0;
    var var1 = "";
    let items2 = LoopParseFunc(code, "\n", "\r");
    for (let A_Index2 = 0; A_Index2 < items2.length; A_Index2++) {
        const A_LoopField2 = items2[A_Index2 - 0];
        if (anyType(later[A_Index2 + 1])) {
            if (usePostfixTypeForTypeDefinition == "on") {
                var1 = "";
                let items3 = LoopParseFunc(A_LoopField2, " ");
                for (let A_Index3 = 0; A_Index3 < items3.length; A_Index3++) {
                    const A_LoopField3 = items3[A_Index3 - 0];
                    if (A_Index3 == 1) {
                        var1 += later[A_Index3 + 1] + " " + A_LoopField3 + " ";
                    } else {
                        var1 += A_LoopField3 + " ";
                    }
                }
                modifiedCode += StringTrimRight(var1, 1) + Chr(10);
                skip = 1;
            } else {
                modifiedCode += later[A_Index2 + 1] + " " + A_LoopField2 + Chr(10);
                skip = 1;
            }
            
        } else {
            if (skip == 0) {
                modifiedCode += A_LoopField2 + Chr(10);
            }
            skip = 0;
        }
    }
    modifiedCode = StringTrimRight(modifiedCode, 1);
console.log(modifiedCode);
    return modifiedCode;
};