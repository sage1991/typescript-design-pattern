import { TextCommand } from "../index"


export class InsertCommand extends TextCommand {
  execute(index: number, text: string) {
    let { content } = this.context
    this.context.content = `${content.substr(0, index)}${text}${content.substr(index)}`
  }
}
