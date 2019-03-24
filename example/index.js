const RESTApi = require('faster-api-deploy');
const app = new RESTApi();

app.get("/returnExample1", (req, res) => ({
    message: "success"
}));

app.get("/returnExample", (req, res) => {

    return {
        message: "success"
    };
});

app.get("/hello", (req, res) => {
    res.status(200);
    return {
        message: "success"
    }
});

app.get("/error", async (req, res) => {
    await sleep(300);
    throw "ssssssssssssssssssssssss";
});

app.get("/sleep", async (req, res) => {
    await sleep(300);
    return {message: "hello world"};
});
// because of setting router like this, now all the request in controller-router we need to add /e prefix 
// e.g. /login => /e/login .....
app.use('/e', require('./controller/index'));

// because of setting router like this, now all the request in controller-router we don't need to add any prefix use function
app.setRESTApiRouter(require('./controller/index'));

const sleep = (time) => new Promise((res, rej) => setTimeout(res, time));

// app.startListening(9000, "dev", "REST Api");

// it's picking info from .env file in root
app.startListening();
