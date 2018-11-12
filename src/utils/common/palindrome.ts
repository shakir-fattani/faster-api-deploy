export const palindromeFor = (str: string) => {
    str = str.toUpperCase().replace(/[\W_]/g, "");
    for (var i = 0; i < str.length / 2; i++)
        if (str[i] != str[str.length - 1 - i])
            return false;

    return true;
};

export const palindromeReverse = (str: string) => {
    str = str.toUpperCase().replace(/[\W_]/g, "");
    return str == str.split("").reverse().join("");
};

export default palindromeFor;