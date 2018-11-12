import AppError from './app-error';
export default class DBError extends AppError {
    constructor(msg) {
        super(msg || "An unexpected error has occurred", 500);
    }
};