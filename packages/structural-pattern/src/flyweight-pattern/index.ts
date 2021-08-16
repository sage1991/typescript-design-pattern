
class ImageSource {
  constructor(public src: string) {}
}

class Snowflake {
  image: ImageSource

  constructor(public style: string) {
    this.image = new ImageSource(`${style}.png`)
  }

  render(x: number, y: number, angle: number): void {
    // do something...
  }
}

class SnowflakeFactory {
  cache: { [style: string]: Snowflake } = {}

  get(style: string): Snowflake {
    let snowflake: Snowflake;

    if (this.cache[style]) {
      snowflake = this.cache[style]
    } else {
      snowflake = new Snowflake(style)
      this.cache[style] = snowflake
    }

    return snowflake
  }
}

const SNOW_STYLES = [ "A", "B", "C" ]

class Sky {
  constructor(public width: number, public height: number) {}

  snow(factory: SnowflakeFactory, count: number) {
    const styleCount = SNOW_STYLES.length

    for (let i = 0; i < styleCount; i++) {
      const style = SNOW_STYLES[randomInt(styleCount)]
      const flake = factory.get(style)

      const x = randomInt(this.width)
      const y = randomInt(this.height)
      const angle = randomInt(60)

      flake.render(x, y, angle)
    }
  }

}


const randomInt = (maximum: number) => {
  return Math.floor(Math.random() * maximum)
}
