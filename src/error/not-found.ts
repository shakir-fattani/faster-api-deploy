import AppError from './app-error';

export default class NotFound extends AppError {
    constructor(msg) {
        super(msg + ' not found' || "not found", 404);
    }
};