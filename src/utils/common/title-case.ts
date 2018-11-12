export const titleCaseForLoop = (str: string) => {
    str = str.toLowerCase();
    var result = "";
    for (let s of str.split(' '))
        result += s[0].toUpperCase() + s.slice(1);
    return result;
};

export const titleCaseMap = (str: string) => {
    return str.toLowerCase().split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
};

export const titleCaseMapReplace = (str: string) => {
    return str.toLowerCase().split(' ').map(word => word.replace(word[0], word[0].toUpperCase())).join(' ');
};

export default titleCaseMap;