import { prefix, suffix } from "./decorator"


export class Person {
  constructor(private name: string) {}

  @prefix("hello,")
  @suffix("nice to meet you~")
  getName() {
    return this.name
  }
}
