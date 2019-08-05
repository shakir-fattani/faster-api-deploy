import AppError from './app-error';

export default class AppNotExists extends AppError {
    constructor(msg, statuscode = 404, detail = "") {
        super(msg || "Invalid appId sent. The application does not exist", statuscode, detail);
    }
};
