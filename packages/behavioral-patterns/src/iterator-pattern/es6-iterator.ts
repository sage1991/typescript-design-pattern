
class SomeData<T> implements Iterable<T> {
  array: T[]

  [Symbol.iterator](): SomeIterator<T> {
    return new SomeIterator(this.array)
  }
}

class SomeIterator<T> implements Iterator<T> {
  private index: number
  constructor(private array: T[]) {
    this.index = array.length - 1
  }

  next(): IteratorResult<T> {
    if (this.index < 0) {
      return {
        done: true,
        value: undefined
      }
    }

    return {
      done: false,
      value: this.array[this.index--]
    }
  }
}

const data = new SomeData<number>()
data.array = [1, 2, 3, 4, 5]

for (const value of data) {
  console.log(value)
}
