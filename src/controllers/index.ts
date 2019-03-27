import RESTRouter from '../class/rest-router';
import RESTResponse from '../class/api/rest-Response';
import testRouter from './test'
let restRouter = new RESTRouter();

restRouter.filter(async (req, res, next) => {
    await sleep()
    next()
})

restRouter.all("/user", async () => {
    return new RESTResponse({ message: "success", data: [] })
});

restRouter.use("/u1", restRouter);
const sleep = (timemilli = 100) => new Promise((res, rej) => {
    setTimeout(res, timemilli);
})
restRouter.use("/test", testRouter)

restRouter.filter(async (req, res, next) => {
    await sleep()
    next()
})

restRouter.use("/u3", restRouter);

export default restRouter;