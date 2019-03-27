import IRESTReqProcess from "./interface/rest-req-process";

let FilterIDCreator = 1;

export default class RESTFilter {
    func: IRESTReqProcess;
    id: number;
    constructor(func: IRESTReqProcess, id:number = FilterIDCreator++){
        this.id = id;
        this.func = func;
    }

    getFunc(): IRESTReqProcess{
        return this.func;
    }

    equal(obj: any){
        if (obj instanceof RESTFilter)
            return obj.id === this.id;
        return false;
    }
}