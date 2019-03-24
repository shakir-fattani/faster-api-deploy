const {RESTRouter} = require('faster-api-deploy');

const sleep = (time) => new Promise((res, rej) => setTimeout(res, time));

const sample = new RESTRouter();

sample.get("/getList", (req, res) => {
    return {
        message:req.url
    };
});

sample.post("/login", (req, res) => {
    let {
        username,
        password
    } = req.body;
    return {
        message:req.url,
        username,
        password
    };
});


sample.filter(async (req, res, next) => {
    // instead of sleep we can do something before this like checking login ,
    // or check validity of request like ACL 
    // this filter will be call before request like /sample, /checkout
    // because these request are listed after this filter

    // in our example like here login is required;
    await sleep(50);

    next();
})

// now all the request of /sample/* will try  sample-controler
// /sample will need to be added as prefix in every request 
// e.g. /get => /sample/get , /post => /sample/post 
sample.use("/sample", require('./sample-controller'))

sample.post("/checkout", (req, res) => {
    let body = req.body;
    // like request body 
    console.log(body);
    return {
        message:req.url
    };
});

module.exports = sample;