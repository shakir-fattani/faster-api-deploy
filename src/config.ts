import * as os from 'os';

let debug = 0;

const HOST = os.hostname()

const COMMON_HEADER = {}


const addCommonHeader = (key, value) => {
    COMMON_HEADER[key] = value;
}
const setVersion = (version = '1.0') => addCommonHeader('X-Version', version)
const setApiVersion = (version = '1.0') => addCommonHeader('X-Api-Version', version)

const setPoweredBy = (poweredBy = 'Appsys 1.0') => addCommonHeader('X-Powered-By', poweredBy)

setVersion('1.0');
setApiVersion('1.0');


const getDebugLevel = () => {
    return debug
}

const setDebugLevel = (debugLevel = 10) => {
    debug = debugLevel;
}

export {
    HOST,
    COMMON_HEADER,
    addCommonHeader,
    setVersion,
    setPoweredBy,
    getDebugLevel,
    setDebugLevel,
    setApiVersion
}
