import restRouter from './controllers/index';

const  RESTApi = require("./index")

let restAPI = new RESTApi();

restAPI.setRESTApiRouter(restRouter);
restAPI.startListening("15000");

export default restAPI;