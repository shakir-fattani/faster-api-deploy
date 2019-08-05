import AppError from './app-error';

export default class UserNotAuthorized extends AppError {
    constructor(msg, statusCode = 403, detail = "") {
        super(msg || "You are not authroized to edit this tree", statusCode, detail);
    }
};