

namespace IteratorPattern {
  export interface SimpleIterator<T> {
    first(): void
    next(): void
    end: boolean
    item: T
    index: number
  }

  export class ArrayIterator<T> implements SimpleIterator<T>{
    private _index: number = 0

    constructor(private array: T[]) {}

    first() {
      this._index = 0
    }

    next() {
      this._index++
    }

    get end(): boolean {
      return this._index >= this.array.length
    }

    get item(): T {
      return this.array[this._index]
    }

    get index(): number {
      return this._index
    }
  }
}

Object.defineProperty(Array.prototype, "simpleIterator", {
  get() {
    return new IteratorPattern.ArrayIterator(this)
  }
})

interface Array<T> {
  simpleIterator: IteratorPattern.SimpleIterator<T>
}
