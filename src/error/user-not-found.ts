import AppError from './app-error';

export default class UserNotFound extends AppError {
    constructor(msg, statusCode = 404, detail = "") {
        super(msg || "Either your email address has not been registered or your password is incorrect", statusCode, detail);
    }
};