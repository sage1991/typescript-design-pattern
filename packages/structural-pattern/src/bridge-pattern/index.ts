export interface UIToolkit {
  drawBorder(): void;
  drawImage(src: string): void;
  drawText(text: string): void;
}

export abstract class UIElement {
  protected constructor(protected toolkit: UIToolkit) {}
  abstract render(): void;
}

export class TextElement extends UIElement {
  constructor(private text: string, toolkit: UIToolkit) {
    super(toolkit)
  }

  render() {
    this.toolkit.drawText(this.text)
  }
}

export class ImageElement extends UIElement {
  constructor(private src: string, toolkit: UIToolkit) {
    super(toolkit)
  }

  render() {
    this.toolkit.drawImage(this.src)
  }
}

const svgToolkit: UIToolkit = new class implements UIToolkit {
  drawImage(src: string) {
    console.log(`draw ${src} from svg`)
  }

  drawText(text: string) {
    console.log(`draw ${text} from svg`)
  }

  drawBorder() {
    console.log(`draw border from svg`)
  }
}()

const canvasToolkit: UIToolkit = new class implements UIToolkit {
  drawImage(src: string) {
    console.log(`draw ${src} from canvas`)
  }

  drawText(text: string) {
    console.log(`draw ${text} from canvas`)
  }

  drawBorder() {
    console.log(`draw border from canvas`)
  }
}()


const image = new ImageElement("foo.jpg", svgToolkit)
const text = new TextElement("bar", canvasToolkit)

image.render()
text.render()
