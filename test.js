const TYPE = {
    MAIN: "MAIN",
    PAGE: "PAGE",
    REGEX: "REGEX",
}

const object = {
    type: TYPE.MAIN,
    path: "/",
    visible: true,
    cbf: async (req) => {
    },
    childs: {
        // "api" :{
        //     type: TYPE.PAGE,
        //     path: "/",
        //     function: async (req) => {

        //     },
        //     childs: {}
        // },
        // "web" :{
        //     type: TYPE.PAGE,
        //     path: "/",
        //     function: async (req) => {

        //     },
        //     childs: {}
        // },
    }
}


// url must be "/api/user/login"
// or be like "/web/index"
// or be like "/web/"

const addApiCall = (url) => {
    let s = url.split('/');
    s.splice(1);
    let n = object;
    let count = s.length;

    let changePath = [""]

    for (let i of s) {
        if (i in n.childs) {
            n = n.childs;
        } else {
            n.childs[i] = {
                type: TYPE.PAGE,
                path: "/",
                function: async (req) => {
                    visible: true
                },
                childs: {}
            }
        }
    }
}