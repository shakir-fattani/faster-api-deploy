import RESTRouter from '../class/rest-router';
import RESTResponse from '../class/api/rest-Response';
import AppError from '../error';
import { Request, Response, NextFunction } from 'express'

let restRouter = new RESTRouter();

restRouter.all("/user", async (req: Request, res:Response, next:NextFunction) => {
    console.log("wwwww")
    next()
}, async () => {
        console.log("sss");
    return new RESTResponse({ message: "succ4574ess", data: [] })
});

restRouter.filter(() => {
    throw new AppError("testing fired");
})


export default restRouter;