export default class AppError extends Error {
    status: number;
    name: string;
    detail: string;
    constructor(message, status = 500, detail = "") {
        super(message);
        this.name = this.constructor.name;
        this.detail = detail;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
};