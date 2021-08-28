import { TextContext } from "../context"
import { ReplaceCommand } from "../command/imple/ReplaceCommand"
import { InsertCommand } from "../command/imple/InsertCommand"


export class Client {
  private context: TextContext = new TextContext()
  private replaceCommand = new ReplaceCommand(this.context)
  private insertCommand = new InsertCommand(this.context)

  replace = this.replaceCommand.execute
  insert = this.insertCommand.execute
}
