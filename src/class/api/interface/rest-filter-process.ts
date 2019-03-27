import RESTFilter from "../rest-filter";

export default interface IRESTFilterProcess {
    (ids: number[]): RESTFilter[];
}