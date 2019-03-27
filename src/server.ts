import restRouter from './controllers/index';

const  RESTApi = require("./index")

let restAPI = new RESTApi();
restAPI.get("/see", () => ({message: "hello"}))
restAPI.setRESTApiRouter(restRouter);
restAPI.startListening("15000");

export default restAPI;