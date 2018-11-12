# faster-api-deploy
wrapper over express

sample.

const RESTApi = require('faster-api-deploy');
const app = new RESTApi();

app.get("/hello", (req, res) => {
    res.status(200);

    return {
        message: "success"
    }
});

app.get("/he", async (req, res) => {
    await sleep(300);
    throw "ssssssssssssssssssssssss"
});

const sleep = (time) => {
    return new Promise((res, rej) => {
        setTimeout(res, time);
    });
};

// app.startListening(9000, "dev", "REST Api");

// it's picking info from .env file in root
app.startListening();


