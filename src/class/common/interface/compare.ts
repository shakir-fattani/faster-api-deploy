export default interface ICompare {
    compareTo(node:ICompare): number;
    equal(node: ICompare): boolean;
}