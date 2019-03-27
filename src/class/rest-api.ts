import * as express from 'express'
import * as compression from "compression";
import { json, urlencoded } from "body-parser";
import * as dotenv from "dotenv";
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
import { COMMON_HEADER, setVersion, setPoweredBy, addCommonHeader, setApiVersion } from '../config';
import IRESTReqProcess from './api/interface/rest-req-process';
import RESTResponse from './api/rest-Response';
import * as HTTP_STATUS from './../utils/api/http-status-code'
import * as CONSOLE_COLORS from './../utils/colors'

export default class RESTApi {
    app: express.Express;
    server: Server;
    appRouter: RESTRouter;
    appName: string = "REST API";
    version: string = "1.0";
    errorHandler = (err, req, res, next) => {
        if (!(err instanceof NotFound))
            console.trace(err)
        else
            console.error(err.message)
        if (res.headerSent) {
            console.log('Response already sent hence sending error next');
            return next(err);
        }

        if (err instanceof AppError)
            return res.status(err.status).json({ error: err.message });
        else {
            return res.status(500).json({ error: err.message ? err.message : err });
        }
    }

    constructor(basePath: String = "") {
        this.app = express();
        this.appRouter = new RESTRouter();
        this.app.use(compression());
        this.app.use(urlencoded({limit: '50mb', extended: true}));
        this.app.use(json({limit: '50mb'}));

        dotenv.config({ path: ".env" });
        this.app.disable('x-powered-by');
        this.app.use((req, res, next) => {
            res.set(COMMON_HEADER);
            next();
        })
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

    addCommonHeader(key, value): RESTApi {
        addCommonHeader(key, value)
        return this;
    }

    setErrorHandler(errorHandler): RESTApi {
        this.errorHandler = errorHandler
        return this;
    }

    private setErrorHandlerInExpress(): RESTApi {
        this.app.use((req, res, next) => {
            throw new NotFound(req.originalUrl);
        })

        this.app.use(this.errorHandler);
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
        // this.app.use(RESTRouter.getCommonRequestWrapper(handler))
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

    startListening(port: string = process.env.PORT, appName: string = process.env.APP_NAME, mode: string = process.env.ENV): Promise<Server> {
        const self = this;

        self.app.use(this.appRouter.router);
        return new Promise<Server>((res, rej) => {
            if (appName)
                self.appName = appName;
            self.setErrorHandlerInExpress()
            self.server = self.app.listen(port, () => {
                console.log(`\tAppName: ${self.appName}`)
                console.log(`\tApp is running at http://localhost:${port} in ${mode} mode`)
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
