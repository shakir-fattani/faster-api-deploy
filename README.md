# faster-api-deploy
wrapper over express

sample code.
```
const RESTApi = require('faster-api-deploy');
const app = new RESTApi();

app.get("/returnExample", (req, res) => {

    return {
        message: "success"
    }
});

app.get("/hello", (req, res) => {
    res.status(200);

    return {
        message: "success"
    }
});

app.get("/error", async (req, res) => {
    await sleep(300);
    throw "ssssssssssssssssssssssss"
});

app.get("/sleep", async (req, res) => {
    await sleep(300);
    return {message: "hello world"};
});

const sleep = (time) => {
    return new Promise((res, rej) => {
        setTimeout(res, time);
    });
};

// app.startListening(9000, "dev", "REST Api");

// it's picking info from .env file in root
app.startListening();
```

