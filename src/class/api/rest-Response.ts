import { HTTP_S_OK } from './../../utils/api/http-status-code'
import { Response } from 'express'

export default class RESTResponse {

    static get JSON_CONTENT_TYPE(): string {
        return "application/json";
    }

    body: any;
    contentType: string;
    statusCode: number = HTTP_S_OK;

    constructor(body: any = {}, contentType: string = RESTResponse.JSON_CONTENT_TYPE, statusCode: number = HTTP_S_OK) {
        this.body = body;
        this.contentType = contentType;
        this.statusCode = statusCode;
    }

    sendResponse(response: Response) {
        response.status(this.statusCode);

        if (this.contentType == RESTResponse.JSON_CONTENT_TYPE){
            response.json(this.body);
        } else {
            if (!(this.body instanceof String))
                this.body = JSON.stringify(this.body);
            response.contentType(this.contentType)
            response.write(this.body);
            response.end();
        }
    }
}