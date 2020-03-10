import * as express from 'express'
import * as bodyParser from "body-parser";
import { Server } from 'http';
import AppError from '../error/app-error';
import NotFound from '../error/not-found';
import UserDisabled from '../error/user-disabled';
import UserExists from '../error/user-exists';
import UserNotFound from '../error/user-not-found';
import UserNotAuthorized from '../error/user_not_authorized';
import AppNotExists from '../error/app-not-exists';
import DBError from '../error/db-error';

import RESTRouter from './rest-router';
import { COMMON_HEADER, setVersion, setPoweredBy, addCommonHeader, setApiVersion, getDebugLevel, setDebugLevel } from '../config';
import IRESTReqProcess from './api/interface/rest-req-process';
import RESTResponse from './api/rest-Response';
import * as HTTP_STATUS from './../utils/api/http-status-code'
import * as CONSOLE_COLORS from './../utils/colors'

export default class RESTApi {
    app: express.Express;
    server: Server;
    listeningIp: string = "127.0.0.1";
    appRouter: RESTRouter;
    appName: string = "REST API";
    version: string = "1.0";
    port: number = 23200;
    mode: string = "PRODUCTION";
    errorHandler = (err, req, res, next) => {
        if (!(err instanceof NotFound)) {
            if (getDebugLevel() < 5) {
                console.error(err.detail ? err.detail : (err.message ? err.message : err))
            } else {
                console.error(err)
            }
        }

        if (res.headerSent) {
            console.log('Response already sent hence sending error next');
            return next(err);
        }

        if (err instanceof AppError)
            return res.status(err.status).json({ code: err.status, error: err.message });
        else if (err instanceof Error)
            return res.status(500).json({ code: 515, error: "Internal Server Error" });
        else if (typeof err === 'string')
            return res.status(500).json({ code: 515, error: err });
        else
            return res.status(500).json({ code: 515, error: err.message ? err.message : err });
    }

    constructor(basePath: String = "", {
        isSupportJSON = true,
        isSupportURLEncode = false,
        isSupportText = false,
        isSupportRaw = false
    } = {}) {
        this.app = express();
        this.appRouter = new RESTRouter();

        isSupportURLEncode && this.app.use(bodyParser.urlencoded());
        isSupportJSON && this.app.use(bodyParser.json());
        isSupportText && this.app.use(bodyParser.text());
        isSupportRaw && this.app.use(bodyParser.raw());

        this.app.disable('x-powered-by');
        this.app.use((req, res, next) => {
            res.set(COMMON_HEADER);
            next();
        })
    }

    setListeningIP(ipAddress: string): RESTApi {
        this.listeningIp = ipAddress;
        return this;
    }

    setVersion(version): RESTApi {
        this.version = version;
        setVersion(version)
        return this;
    }

    setApiVersion(version): RESTApi {
        setApiVersion(version)
        return this;
    }

    setPoweredBy(poweredBy): RESTApi {
        setPoweredBy(poweredBy)
        return this;
    }

    static setDebugLevel(level: number = 5) {
        setDebugLevel(level)
    }

    static getDebugLevel(): number {
        return getDebugLevel()
    }

    addCommonHeader(key, value): RESTApi {
        addCommonHeader(key, value)
        return this;
    }

    setErrorHandler(errorHandler): RESTApi {
        this.appRouter.expressUseSingleParam((err, req, res, next) => this.errorHandler(err, req, res, next));
        return this;
    }

    setErrorHandlerGlobal(errorHandler): RESTApi {
        this.errorHandler = errorHandler
        return this;
    }

    private setErrorHandlerInExpress(): RESTApi {
        this.app.use((req, res, next) => next(new NotFound(req.originalUrl)))

        this.app.use((err, req, res, next) => this.errorHandler(err, req, res, next));
        return this;
    }

    expressUseSingleParam(a: any): RESTApi {
        this.appRouter.expressUseSingleParam(a)
        return this;
    }

    expressUseDoubleParam(a: any, b: any): RESTApi {
        this.appRouter.expressUseDoubleParam(a, b)
        return this;
    }

    defineWeb(path: string, dir: string): RESTApi {
        this.appRouter.defineWeb(path, dir);
        return this;
    }

    setRESTApiRouter(handler: RESTRouter): RESTApi {
        this.appRouter.setRESTApiRouter(handler)
        return this;
    }

    use(path: string, handler: RESTRouter): RESTApi {
        this.appRouter.use(path, handler);
        return this;
    }

    smartfilter(...handler: IRESTReqProcess[]): RESTApi {
        this.appRouter.smartfilter.apply(this.appRouter, handler);
        return this;
    }

    filter(...handler: IRESTReqProcess[]): RESTApi {
        this.appRouter.filter.apply(this.appRouter, handler);
        return this;
    }

    get(path: string | IRESTReqProcess, ...handler: IRESTReqProcess[]): RESTApi {
        this.appRouter.get.apply(this.appRouter, [path].concat(handler));
        return this;
    }

    head(path: string | IRESTReqProcess, ...handler: IRESTReqProcess[]): RESTApi {
        this.appRouter.head.apply(this.appRouter, [path].concat(handler));
        return this;
    }

    patch(path: string | IRESTReqProcess, ...handler: IRESTReqProcess[]): RESTApi {
        this.appRouter.patch.apply(this.appRouter, [path].concat(handler));
        return this;
    }

    options(path: string | IRESTReqProcess, ...handler: IRESTReqProcess[]): RESTApi {
        this.appRouter.options.apply(this.appRouter, [path].concat(handler));
        return this;
    }

    put(path: string | IRESTReqProcess, ...handler: IRESTReqProcess[]): RESTApi {
        this.appRouter.put.apply(this.appRouter, [path].concat(handler));
        return this;
    }

    delete(path: string | IRESTReqProcess, ...handler: IRESTReqProcess[]): RESTApi {
        this.appRouter.delete.apply(this.appRouter, [path].concat(handler));
        return this;
    }

    all(path: string | IRESTReqProcess, ...handler: IRESTReqProcess[]): RESTApi {
        this.appRouter.all.apply(this.appRouter, [path].concat(handler));
        return this;
    }

    post(path: string | IRESTReqProcess, ...handler: IRESTReqProcess[]): RESTApi {
        this.appRouter.post.apply(this.appRouter, [path].concat(handler));
        return this;
    }

    startListening(port: number, appName: string, mode: string): Promise<Server> {
        const self = this;
        appName && (self.appName = appName)
        port && (self.port = port)
        mode && (self.mode = mode)

        self.app.use(this.appRouter.router);
        return new Promise<Server>((res, rej) => {
            self.setErrorHandlerInExpress()
            self.server = self.app.listen(self.port, self.listeningIp, () => {
                console.log(`\tAppName: ${self.appName}`)
                console.log(`\tApp is running at http://${self.listeningIp}:${self.port} in ${self.mode} mode`)
                console.log(`\tRunning App version is ${self.version}`)
                console.log(`\tPress CTRL-C to stop `)
                res(self.server);
            });
        })
    }

    static get RESTRouter(): any {
        return RESTRouter;
    }
    static get RESTResponse(): any {
        return RESTResponse;
    }
    static get HTTP_STATUS(): any {
        return HTTP_STATUS;
    }
    static get CONSOLE_COLORS(): any {
        return CONSOLE_COLORS;
    }
    static get ERRORS(): any {
        return {
            AppError,
            NotFound,
            DBError,
            AppNotExists,
            UserDisabled,
            UserExists,
            UserNotAuthorized,
            UserNotFound
        };
    }
}
