

const singletonA = {
  foo(): void {
    console.log("bar")
  }
}


const singletonB = (() => {
  const bar = "bar"  // private

  return {
    foo(): void {
      console.log(bar)
    }
  }
})()


const singletonC = new class {
  bar = "bar"

  foo(): void {
    console.log(this.bar)
  }
}


class Singleton {
  private static _instance: Singleton;
  private constructor() {}

  static get instance(): Singleton {
    if (Singleton._instance) {
      return Singleton._instance
    }

    Singleton._instance = new Singleton()
    return Singleton._instance
  }
}
