import ICompare from './interface/compare';
import ISortingFun from './interface/sorting-fun';
export default class Queue<T extends ICompare> {
    _list: T[] = [];

    push(data: T): void {
        this._list.push(data);
    }

    sort(cb: ISortingFun<T> = (a: T, b: T): number => a.compareTo(b)) {
        this._list.sort(cb);
    }

    remove(item: T): void {
        this._list.forEach((value, index) => {
            if (value.equal(item))
                this._list.splice(index, 1);
        })
    }

    pop(): T {
        return this._list.shift();
    }

    getList(): T[] {
        return this._list;
    }
}