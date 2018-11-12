import AppError from './app-error';

export default class UserNotAuthorized extends AppError {
    constructor(msg) {
        super(msg || "You are not authroized to edit this tree", 403);
    }
};