export const findLongestWordSort = str => {
    return str.split(" ").sort((a, b) => b.length - a.length)[0];
};

export const findLongestWordForLoop = str => {
    var current = "";
    for (let s of str.split(" "))
        if (s.length > current.length)
            current = s;
    return current;
};

export const findLongestWordReduce = str => {
    return str.split(" ").reduce((longestWord, current) => current.length > longestWord.length ? current : longestWord, "");
};

export default findLongestWordReduce;