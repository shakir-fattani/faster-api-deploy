export const confirmEndingBuiltInFunc = (str, ending) => {
    return str.endsWith(ending);
};

export const confirmEndingFinding = (str, ending) => {
    return str.substr(-ending.length) == ending;
};

export default confirmEndingBuiltInFunc;