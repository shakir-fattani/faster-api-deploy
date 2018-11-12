import ICompare from './../common/interface/compare';

export default class NodeWeight implements ICompare {
    nodeNo: number;
    weight: number;

    constructor(nodeNo: number, weight: number) {
        this.nodeNo = nodeNo;
        this.weight = weight;
    }

    compareTo(nodeWeight: NodeWeight) {
        return  0 + this.weight - nodeWeight.weight;
    }

    equal(item: ICompare) {
        return item instanceof NodeWeight && item.nodeNo == this.nodeNo;
    }
}