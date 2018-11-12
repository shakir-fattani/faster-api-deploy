export const factorializeRecursion = (num: number) => {
    return num < 0 ? -1 : num == 0 ? 1 : (num * factorializeRecursion(num - 1));
};

export const factorializeWhileLoop = (num: number) => {
    if (num === 0 || num === 1)
        return 1;
    var result = num;
    while (num-- > 1)
        result *= num;
    return result;
};

export const factorializeForLoop = (num: number) => {
    if (num === 0 || num === 1)
        return 1;
    var result = num;
    for (var i = num - 1; i >= 1; i--)
        result *= i;
    return result;
};

export default factorializeForLoop;