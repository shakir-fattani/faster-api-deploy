import * as express from 'express'
import * as compression from "compression";
import { json, urlencoded } from "body-parser";
import * as dotenv from "dotenv";
import { Server } from 'http';
import AppError from '../error/app-error';
import NotFound from '../error/not-found';
import RESTRouter from './rest-router';
import { COMMON_HEADER, setVersion, setPoweredBy, addCommonHeader, setApiVersion } from '../config';
import IRESTReqProcess from './api/interface/rest-req-process';
import RESTResponse from './api/rest-Response';
import * as HTTP_STATUS from './../utils/api/http-status-code'
import * as CONSOLE_COLORS from './../utils/colors'

export default class RESTApi {
    app: express.Express;
    server: Server;
    appName: string = "REST API";
    version: string = "1.0";
    errorHandler = (err, req, res, next) => {
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
        this.app.use(compression());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(json());

        dotenv.config({ path: ".env" });
        this.app.disable('x-powered-by');
        this.app.use((req, res, next) => {
            res.set(COMMON_HEADER);
            next();
        })
    }

    setVersion(version) {
        this.version = version;
        setVersion(version)
    }

    setApiVersion(version) {
        setApiVersion(version)
    }

    setPoweredBy(poweredBy) {
        setPoweredBy(poweredBy)
    }

    addCommonHeader(key, value) {
        addCommonHeader(key, value)
    }

    setErrorHandler(errorHandler) {
        this.errorHandler = errorHandler
    }

    private setErrorHandlerInExpress() {
        this.app.use((req, res, next) => {
            throw new NotFound(req.originalUrl);
        })

        this.app.use(this.errorHandler);
    }

    expressUseSingleParam(a: any){
        this.app.use(a)
    }

    expressUseDoubleParam(a:any, b:any){
        this.app.use(a, b)
    }

    defineWeb(path: string, dir: string): void{
        this.app.use(path, express.static(dir));
    }

    setRESTApiRouter(restRouter: RESTRouter) {
        this.app.use(restRouter.router);
    }
    
    use(path: string, handler: RESTRouter): void {
        this.app.use(path, handler.router)
    }

    get(path: string, ...handler: IRESTReqProcess[]): void {
        this.app.get(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    head(path: string, ...handler: IRESTReqProcess[]): void {
        this.app.head(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    patch(path: string, ...handler: IRESTReqProcess[]): void {
        this.app.patch(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    options(path: string, ...handler: IRESTReqProcess[]): void {
        this.app.options(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    put(path: string, ...handler: IRESTReqProcess[]): void {
        this.app.put(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    delete(path: string, ...handler: IRESTReqProcess[]): void {
        this.app.delete(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    all(path: string, ...handler: IRESTReqProcess[]): void {
        this.app.all(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    post(path: string, ...handler: IRESTReqProcess[]): void {
        this.app.post(path, RESTRouter.getCommonRequestWrapper(handler))
    }

    startListening(port: string = process.env.PORT, appName: string = process.env.APP_NAME, mode: string = process.env.ENV): Promise<Server> {
        const self = this;
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
}