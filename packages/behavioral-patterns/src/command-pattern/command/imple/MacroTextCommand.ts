import { Command, TextCommand } from "../index"


export interface TextCommandInfo<T extends TextCommand> {
  command: T
  args: Parameters<T["execute"]>
}

export class MacroTextCommand implements Command {
  constructor(private infos: TextCommandInfo<any>[]) {}

  execute(): void {
    this.infos.forEach((info) => info.command.execute(...info.args))
  }
}
