import AppError from './app-error';

export default class UserDisabled extends AppError {
    constructor(msg) {
        super(msg || "Your account has been disabled", 403);
    }
};