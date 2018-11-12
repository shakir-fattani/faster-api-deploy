import AppError from './app-error';

export default class AppNotExists extends AppError {
    constructor(msg) {
        super(msg || "Invalid appId sent. The application does not exist", 404);
    }
};
