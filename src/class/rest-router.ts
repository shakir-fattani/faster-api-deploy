import { Router, RequestHandler, RequestParamHandler } from 'express';
import * as express from 'express';
import IRESTReqProcess from './api/interface/rest-req-process';
import RESTResponse from './api/rest-Response';
export default class RESTRouter {
    router: Router;

    constructor() {
        this.router = Router();
    }

    filter(handler: RequestHandler): void {
        this.router.use(async (req, res, next) => {
            try {
                await handler(req, res, next);
            } catch (e) {
                next(e);
            }
        })
    }

    expressUseSingleParam(a: any){
        this.router.use(a)
    }

    expressUseDoubleParam(a:any, b:any){
        this.router.use(a, b)
    }

    use(path: string, handler: RESTRouter): void {
        this.router.use(path, handler.router)
    }

    defineWeb(path: string, dir: string): void{
        this.router.use(path, express.static(dir));
    }

    static getCommonRequestWrapper(handler: IRESTReqProcess[]): RequestHandler{
        return async (req, res, next: IRESTReqProcess) => {
            try {
                handler.push(next);
                let r = null;
                for (var i = 0 ; i < handler.length ; i++)
                    r = await handler[i](req, res, handler.length > i+1 ? handler[i+1] : undefined)
                if (r) {
                    if (!(r instanceof RESTResponse))
                        r = new RESTResponse(r);
                    r.sendResponse(res)
                }
            } catch (e) {
                next(e)
            }
        };
    }

    get(path: string, ...handler: IRESTReqProcess[]): void {
        this.router.get(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    head(path: string, ...handler: IRESTReqProcess[]): void {
        this.router.head(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    patch(path: string, ...handler: IRESTReqProcess[]): void {
        this.router.patch(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    options(path: string, ...handler: IRESTReqProcess[]): void {
        this.router.options(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    put(path: string, ...handler: IRESTReqProcess[]): void {
        this.router.put(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    delete(path: string, ...handler: IRESTReqProcess[]): void {
        this.router.delete(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    all(path: string, ...handler: IRESTReqProcess[]): void {
        this.router.all(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    post(path: string, ...handler: IRESTReqProcess[]): void {
        this.router.post(path, RESTRouter.getCommonRequestWrapper(handler))
    }
}