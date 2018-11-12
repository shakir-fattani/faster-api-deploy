export default class AppError extends Error {
    status: number;
    name: string;
    constructor(message, status = 500) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status = status;
    }
};