import { UIComponent } from "./UIComponent"
import { Text, TextComponent } from "./TextComponent"

export class Decorator extends UIComponent {
  constructor(public component: TextComponent) {
    super()
  }

  get texts(): Text[] {
    return this.component.texts
  }

  draw(): void {
    this.component.draw()
  }
}

export class ColorDecorator extends Decorator {
  constructor(component: TextComponent, public color: string) {
    super(component)
  }

  draw() {
    for (let i = 0; i < this.texts.length; i++) {
      this.texts[i].setColor(this.color)
    }
    super.draw()
  }
}

export class FontDecorator extends Decorator {
  constructor(component: TextComponent, public font: string) {
    super(component)
  }

  draw() {
    for (let i = 0; i < this.texts.length; i++) {
      this.texts[i].setFont(this.font)
    }
    super.draw()
  }
}
