export const reverseStringBuiltInFunc = str => {
    return str.split("").reverse().join("");
};

export const reverseStringRecursion = str => {
    return str === "" ? "" : reverseStringRecursion(str.substr(1)) + str[0];
};

export const reverseStringDecrementing = str => {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--)
        newString += str[i];
    return newString;
};

export default reverseStringRecursion;
