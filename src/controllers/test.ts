import RESTRouter from '../class/rest-router';
import RESTResponse from '../class/api/rest-Response';
import AppError from '../error';

let restRouter = new RESTRouter();

restRouter.all("/user", async (req) => {
    return new RESTResponse({ message: "success", data: [] })
});

restRouter.filter((req, res, next) => {
    throw new AppError("testing fired");
})


export default restRouter;