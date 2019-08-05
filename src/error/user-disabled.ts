import AppError from './app-error';

export default class UserDisabled extends AppError {
    constructor(msg, statusCode = 403, detail = "") {
        super(msg || "Your account has been disabled", statusCode, detail);
    }
};