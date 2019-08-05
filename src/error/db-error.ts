import AppError from './app-error';
export default class DBError extends AppError {
    constructor(msg, statusCode = 500, detail = "") {
        super(msg || "An unexpected error has occurred", statusCode, detail);
    }
};