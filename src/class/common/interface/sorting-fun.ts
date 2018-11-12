import ICompare from './compare';

export default interface ISortingFun<T extends ICompare> {
    (a: T, b: T): number;
}