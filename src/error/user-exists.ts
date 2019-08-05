import AppError from './app-error';

export default class UserExists extends AppError {
    constructor(msg, statusCode = 409, detail = "") {
        super(msg || "User already exists", statusCode, detail);
    }
};