export const telephoneCheck = (str: string) => {
    if (str.startsWith("1 "))
        str = str.substring(2);

    str = str.replace(/-/g, "").replace(/\s/g, "");

    if (/\([0-9]{3}\)/g.test(str))
        str = str.replace(/\(/g, "").replace(/\)/g, " ");

    return str.length == 10 && /[0-9]{10}/.test(str);
};

export default telephoneCheck;