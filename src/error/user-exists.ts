import AppError from './app-error';

export default class UserExists extends AppError {
    constructor(msg) {
        super(msg || "User already exists", 409);
    }
};