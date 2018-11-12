import PriorityQueue from "../common/priority-queue";
import NodeWeight from "./node-weight";

export default class Dijkstra {
  mPaths: object = {};
  gNodes: number;
  gFrom: number[];
  gTo: number[];
  gWeight: number[];

  constructor(
    gNodes: number = 6,
    gFrom: number[] = [1, 1, 2, 2, 3, 3, 4, 5, 2],
    gTo: number[] = [2, 3, 5, 4, 5, 4, 5, 6, 6],
    gWeight: number[] = [2, 2, 10, 100, 5, 9, 5, 3, 8]
  ) {
    this.gNodes = gNodes;
    this.gFrom = gFrom;
    this.gTo = gTo;
    this.gWeight = gWeight;
  }

  minCost() {
    this.computeCost();
    let visitedList: boolean[] = [];
    for (var i = 0; i < this.gNodes; i++) visitedList[i] = false;

    let queue = new PriorityQueue<NodeWeight>();
    queue.push(new NodeWeight(1, 0));
    var qm;

    while ((qm = queue.pop()) != null) {
      console.log(qm.nodeNo + ": " + qm.weight);
      if (qm.nodeNo == this.gNodes) break;

      let directNodes = this.listOfDirectNodesFrom(qm.nodeNo, qm.weight);
      visitedList[qm.nodeNo - 1] = true;

      for (let directNode of directNodes)
        if (!visitedList[directNode.nodeNo - 1]) {
          let nw = this.findNodeWeight(queue, directNode.nodeNo);

          if (!nw) queue.push(directNode);
          else if (nw.weight > directNode.weight) {
            queue.remove(nw);
            nw.weight = directNode.weight;
            queue.push(nw);
          }
        }
    }
  }

  findNodeWeight(list: PriorityQueue<NodeWeight>, nodeNo: number): NodeWeight {
    for (let item of list.getList()) if (item.nodeNo == nodeNo) return item;
    return undefined;
  }

  computeCost() {
    this.mPaths = {};
    for (var i = 0; i < this.gFrom.length; i++) {
      let from = this.gFrom[i];
      let to = this.gTo[i];
      let weight = this.gWeight[i];

      if (!(from in this.mPaths)) this.mPaths[from] = [];

      this.mPaths[from].push([to, weight]);
    }
  }

  listOfDirectNodesFrom(from: number, currentWeight: number): NodeWeight[] {
    let result: NodeWeight[] = [];

    if (from in this.mPaths)
      this.mPaths[from].forEach((value, index) => {
        result.push(new NodeWeight(value[0], currentWeight + value[1]));
      });

    return result;
  }
}
