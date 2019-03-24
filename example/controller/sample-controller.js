const {RESTRouter} = require('faster-api-deploy');

const sleep = (time) => new Promise((res, rej) => setTimeout(res, time));

const sample = new RESTRouter();

sample.get("/get", (req, res) => {
    return {
        message:req.url
    };
});

sample.post("/post", (req, res) => {
    return {
        message:req.url
    };
});

sample.head("/head", (req, res) => {
    return {
        message:req.url
    };
});

sample.options("/options", (req, res) => {
    return {
        message:req.url
    };
});

sample.delete("/delete", (req, res) => {
    return {
        message:req.url
    };
});

sample.filter(async (req, res, next) => {
    // instead of sleep we can do something before this like checking login ,
    // or check validity of request like ACL 
    // this filter will be call before request like /patch, /all, /put 
    // because these request are listed after this filter
    await sleep(50);

    next();
})


sample.patch("/patch", (req, res) => {
    await sleep(20);
    return {
        message:req.url
    };
});


sample.all("/all", (req, res) => {
    await sleep(30);
    return {
        message:req.url
    };
});

sample.put("/put", (req, res) => {
    await sleep(10);
    return {
        message:req.url
    };
});


module.exports = sample;