import { UIComponent } from "./UIComponent"


export class TextComponent extends UIComponent {
  constructor(public texts: Text[]) {
    super()
  }

  draw(): void {
    for (let i = 0; i < this.texts.length; i++) {
      this.texts[i].draw()
    }
  }
}


export class Text {
  private color: string = "black"
  private font: string = "sans-serif"
  constructor(private content: string) {}

  setColor(color: string): void {
    this.color = color
  }

  setFont(font: string): void {
    this.font = font
  }

  draw(): void {
    console.log(`${this.content}`, `color: ${this.color}; font-family: ${this.font}`)
  }
}
