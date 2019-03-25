import { Router, RequestHandler, RequestParamHandler } from 'express';
import * as express from 'express';
import IRESTReqProcess from './api/interface/rest-req-process';
import RESTResponse from './api/rest-Response';
export default class RESTRouter {
    router: Router;

    constructor() {
        this.router = Router();
    }

    filter(...handler: IRESTReqProcess[]): RESTRouter {
        this.router.use(RESTRouter.getCommonRequestWrapper(handler))
        return this;
    }

    expressUseParam(...a: any[]): RESTRouter {
        this.router.use(a)
        return this;
    }

    expressUseSingleParam(a: any): RESTRouter {
        this.router.use(a)
        return this;
    }

    expressUseDoubleParam(a: any, b: any): RESTRouter {
        this.router.use(a, b)
        return this;
    }

    use(path: string, handler: RESTRouter): RESTRouter {
        this.router.use(path, handler.router)
        return this;
    }

    defineWeb(path: string, dir: string): RESTRouter {
        this.router.use(path, express.static(dir));
        return this;
    }

    static getCommonRequestWrapper(mh: IRESTReqProcess[]): RequestHandler {
        return async (req, res, next) => {
            let handler = mh.filter(i => true);
            
            let nextFunc = async (error) => {
                if (error) {
                    next(error);
                    return;
                }
                try {
                    // console.log(handler)
                    if (handler.length > 0){
                        let r = await handler.shift()(req, res, nextFunc)
                        if (r) {
                            if (!(r instanceof RESTResponse))
                                r = new RESTResponse(r);
                            r.sendResponse(res)
                        }
                    } else {
                        if (next)
                            await next()
                        // if (r) {
                        //     if (!(r instanceof RESTResponse))
                        //         r = new RESTResponse(r);
                        //     r.sendResponse(res)
                        // }
                    }
                } catch (e) {
                    next(e)
                }
            }
            nextFunc(undefined)
        };
    }

    setRESTApiRouter(restRouter: RESTRouter): RESTRouter {
        this.router.use(restRouter.router);
        return this;
    }

    get(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.get(path, RESTRouter.getCommonRequestWrapper(handler))
        return this;
    }

    head(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.head(path, RESTRouter.getCommonRequestWrapper(handler))
        return this;
    }

    patch(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.patch(path, RESTRouter.getCommonRequestWrapper(handler))
        return this;
    }

    options(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.options(path, RESTRouter.getCommonRequestWrapper(handler))
        return this;
    }

    put(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.put(path, RESTRouter.getCommonRequestWrapper(handler))
        return this;
    }

    delete(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.delete(path, RESTRouter.getCommonRequestWrapper(handler))
        return this;
    }

    all(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.all(path, RESTRouter.getCommonRequestWrapper(handler))
        return this;
    }

    post(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.post(path, RESTRouter.getCommonRequestWrapper(handler))
        return this;
    }
}