import { TextContext } from "../context"


export interface Command {
  execute(...args: any[]): void
}

export abstract class TextCommand implements Command {
  constructor(protected context: TextContext) {}
  abstract execute(...args: any[]): void
}
