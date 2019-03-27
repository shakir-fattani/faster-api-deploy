import { Request, Response, NextFunction } from 'express'

export default interface IRESTReqProcess {
    (req: Request, res: Response, next: NextFunction): Promise<any>;
    (req: Request, res: Response, next: NextFunction): any;
    (req: Request, res: Response, next: NextFunction): void;
}