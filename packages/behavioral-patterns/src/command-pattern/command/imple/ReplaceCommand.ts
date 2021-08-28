import { TextCommand } from "../index"


export class ReplaceCommand extends TextCommand {
  execute(index: number, length: number, text: string): void {
    let { content } = this.context
    this.context.content = `${content.substr(0, index)}${text}${content.substr(index + length)}`
  }
}
