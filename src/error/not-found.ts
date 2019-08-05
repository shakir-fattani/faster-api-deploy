import AppError from './app-error';

export default class NotFound extends AppError {
    constructor(msg, statusCode= 404, detail = "") {
        super(msg + ' not found' || "not found", statusCode, detail);
    }
};