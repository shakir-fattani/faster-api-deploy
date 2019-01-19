import { Request, Response, NextFunction } from 'express'

export default interface IRESTReqProcess {
    (req: Request, res: Response, next: NextFunction): Promise<any>;
    (req: Request, res: Response, next: NextFunction): any;
    (req: Request, res: Response, next: NextFunction): void;

    // (req: Request, res: Response): Promise<any>;
    // (req: Request, res: Response): any;
    // (req: Request, res: Response): void;

    // (req: Request): Promise<any>;
    // (req: Request): any;
    // (req: Request): void;

    // (): Promise<any>;
    // (): any;
    // (): void;
}