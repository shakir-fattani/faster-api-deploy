import { Router, RequestHandler, RequestParamHandler } from 'express';
import * as express from 'express';
import IRESTReqProcess from './api/interface/rest-req-process';
import IRESTFilterProcess from './api/interface/rest-filter-process';
import RESTResponse from './api/rest-Response';
import RESTFilter from './api/rest-filter';

let RouterIDCreator = 1;

export default class RESTRouter {
    _id: number;
    router: Router;
    smartFilterList: RESTFilter[];
    parentFilterCaller: IRESTFilterProcess

    constructor() {
        this._id = RouterIDCreator++;
        this.router = Router();
        this.smartFilterList = []
        this.parentFilterCaller = () => { return []; }
    }

    smartfilter(...handler: IRESTReqProcess[]): RESTRouter {
        this.smartFilterList = this.smartFilterList.concat(handler.map(r => new RESTFilter(r)))
        return this;
    }

    filter(...handler: IRESTReqProcess[]): RESTRouter {
        this.smartFilterList = this.smartFilterList.concat(handler.map(r => new RESTFilter(r)))
        // this.router.use(RESTRouter.getCommonRequestWrapper(handler))
        return this;
    }

    setParentFilters(parentFilter: IRESTFilterProcess): RESTRouter {
        this.parentFilterCaller = parentFilter;
        return this;
    }

    // not recommened
    expressUseParam(...a: any[]): RESTRouter {
        let smartFilter = RESTRouter.getCommonRequestWrapper([], this.getFiltersCall.bind(this));
        this.router.use(smartFilter, a)
        return this;
    }

    // not recommened
    expressUseSingleParam(a: any): RESTRouter {
        let smartFilter = RESTRouter.getCommonRequestWrapper([], this.getFiltersCall.bind(this));
        this.router.use(smartFilter, a)
        return this;
    }

    // not recommened
    expressUseDoubleParam(a: string, b: any): RESTRouter {
        let smartFilter = RESTRouter.getCommonRequestWrapper([], this.getFiltersCall.bind(this));
        this.router.use(a, smartFilter, b);
        return this;
    }

    use(path: string, handler: RESTRouter): RESTRouter {
        // let smartFilter = RESTRouter.getCommonRequestWrapper([].concat(this.smartFilterList), this.getFiltersCall);
        this.router.use(path, handler.setParentFilters(this.getFiltersCall.bind(this)).router)
        return this;
    }

    // in this noFilter appy unless express use is already set
    defineWeb(path: string, dir: string): RESTRouter {
        this.router.use(path, express.static(dir));
        return this;
    }

    getFiltersCall(ids: number[] = []): RESTFilter[] {
        for (let id of ids)
            if (id == this._id)
                return [];
        return this.parentFilterCaller(ids.concat([this._id])).concat(this.smartFilterList);
    }

    static filterToReqProcess(list: RESTFilter[]) : IRESTReqProcess[]{
        let temp = {}
        for (let rf of list)
            if(!(rf.id in temp))
                temp[rf.id] = rf 

        return Object.keys(temp).map(r => temp[r].func)
    }

    static getCommonRequestWrapper(mh: IRESTReqProcess[], getFilters: IRESTFilterProcess): RequestHandler {
        return async (req, res, next) => {
            let handler = RESTRouter.filterToReqProcess(getFilters([])).concat(mh);

            let nextFunc = async (error) => {
                if (error) {
                    next(error);
                    return;
                }
                try {
                    if (handler.length > 0) {
                        let r = await handler.shift()(req, res, nextFunc)
                        if (r) {
                            if (!(r instanceof RESTResponse))
                                r = new RESTResponse(r);
                            r.sendResponse(res)
                        }
                    } else {
                        if (next)
                            await next()
                    }
                } catch (e) {
                    next(e)
                }
            }
            nextFunc(undefined)
        };
    }

    setRESTApiRouter(restRouter: RESTRouter): RESTRouter {
        this.router.use(restRouter.setParentFilters(this.getFiltersCall.bind(this)).router);
        return this;
    }

    get(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.get(path, RESTRouter.getCommonRequestWrapper(handler, this.getFiltersCall.bind(this)))
        return this;
    }

    head(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.head(path,RESTRouter.getCommonRequestWrapper(handler, this.getFiltersCall.bind(this)))
        return this;
    }

    patch(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.patch(path, RESTRouter.getCommonRequestWrapper(handler, this.getFiltersCall.bind(this)))
        return this;
    }

    options(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.options(path, RESTRouter.getCommonRequestWrapper(handler, this.getFiltersCall.bind(this)))
        return this;
    }

    put(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.put(path, RESTRouter.getCommonRequestWrapper(handler, this.getFiltersCall.bind(this)))
        return this;
    }

    delete(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.delete(path, RESTRouter.getCommonRequestWrapper(handler, this.getFiltersCall.bind(this)))
        return this;
    }

    all(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.all(path, RESTRouter.getCommonRequestWrapper(handler, this.getFiltersCall.bind(this)))
        return this;
    }

    post(path: string, ...handler: IRESTReqProcess[]): RESTRouter {
        this.router.post(path, RESTRouter.getCommonRequestWrapper(handler, this.getFiltersCall.bind(this)))
        return this;
    }
}