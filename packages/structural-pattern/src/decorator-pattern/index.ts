import { ColorDecorator, FontDecorator } from "./traditional/Decorator"
import { Text, TextComponent } from "./traditional/TextComponent"
import { Person } from "./es7-proposal/Person"

const decoratedTextComponent = new ColorDecorator(
  new FontDecorator(
    new TextComponent([ new Text("hello world!!!") ]),
    "noto-sans"
  ),
  "red"
)

console.log(decoratedTextComponent);
decoratedTextComponent.draw()

const kim = new Person("kim")
console.log(kim.getName())
