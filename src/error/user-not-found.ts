import AppError from './app-error';

export default class UserNotFound extends AppError {
    constructor(msg) {
        super(msg || "Either your email address has not been registered or your password is incorrect", 404);
    }
};