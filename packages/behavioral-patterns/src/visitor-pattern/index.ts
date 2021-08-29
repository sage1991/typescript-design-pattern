import Node = VisitorPattern.Node
import UnOrderedList = VisitorPattern.UnOrderedList


export namespace VisitorPattern {

  // node
  export interface Node {
    appendTo(visitor: NodeVisitor): void
  }

  export class Text implements Node {
    constructor(public content: string) {}
    appendTo(visitor: NodeVisitor): void {
      visitor.appendText(this)
    }
  }

  export class BoldText implements Node {
    constructor(public content: string) {}
    appendTo(visitor: NodeVisitor): void {
      visitor.appendBold(this)
    }
  }

  export class UnOrderedList implements Node {
    constructor(public items: ListItem[]) {}
    appendTo(visitor: NodeVisitor): void {
      visitor.appendUnOrderedList(this)
    }
  }

  export class ListItem implements Node {
    constructor(public content: string) {}
    appendTo(visitor: NodeVisitor): void {
      visitor.appendListItem(this)
    }
  }


  // visitor
  export interface NodeVisitor {
    appendText(text: Text): void
    appendBold(text: BoldText): void
    appendUnOrderedList(list: UnOrderedList): void
    appendListItem(item: ListItem): void
  }

  export class HTMLVisitor implements NodeVisitor {
    output: string = ""

    appendBold(text: BoldText): void {
      this.output += `<b>${text.content}</b>`
    }

    appendListItem(item: ListItem): void {
      this.output += `<li>${item.content}</li>`
    }

    appendText(text: Text): void {
      this.output += text.content
    }

    appendUnOrderedList(list: UnOrderedList): void {
      this.output += "<ul>"
      list.items.forEach(item => item.appendTo(this))
      this.output += "</ul>"
    }
  }

  export class MarkdownVisitor implements NodeVisitor {
    output: string = ""

    appendBold(text: BoldText): void {
      this.output += `**${text.content}**`
    }

    appendListItem(item: ListItem): void {
      this.output += `- ${item.content}\n`
    }

    appendText(text: Text): void {
      this.output += text.content
    }

    appendUnOrderedList(list: UnOrderedList): void {
      this.output += "\n"
      list.items.forEach(item => item.appendTo(this))
    }
  }

}


const nodes: VisitorPattern.Node[] = [
  new VisitorPattern.Text("Hello, "),
  new VisitorPattern.BoldText("Typescript"),
  new VisitorPattern.Text("! Popular editors:\n"),
  new VisitorPattern.UnOrderedList([
    new VisitorPattern.ListItem("Visual Studio Code"),
    new VisitorPattern.ListItem("Visual Studio"),
    new VisitorPattern.ListItem("WebStorm"),
  ])
]

const htmlVisitor = new VisitorPattern.HTMLVisitor()
const markdownVisitor = new VisitorPattern.MarkdownVisitor()

nodes.forEach((node) => {
  node.appendTo(htmlVisitor)
  node.appendTo(markdownVisitor)
})

console.log(htmlVisitor.output)
console.log(markdownVisitor.output)
