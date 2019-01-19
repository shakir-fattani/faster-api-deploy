import RESTRouter from '../class/rest-router';
import RESTResponse from '../class/api/rest-Response';
import testRouter from './test'
let restRouter = new RESTRouter();

restRouter.all("/user", async () => {
    return new RESTResponse({ message: "success", data: [] })
});

restRouter.use("/test", testRouter)

export default restRouter;