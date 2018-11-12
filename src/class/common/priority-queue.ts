import Queue from './queue';
import ICompare from './interface/compare';

export default class PriorityQueue<T extends ICompare> extends Queue<T> {
    push(data: T): void {
        super.push(data)
        this.sort();
    }

    remove(item: T): void {
        super.remove(item)
        this.sort();
    }
}