import { Engine, FirstStage, Payload, Rocket, Satellite, SecondStage, Stage } from "./Rocket"


export class RocketFactory {
  buildRocket(): Rocket {
    const payload = this.createPayload()
    const stages = this.createStages()

    const rocket = new Rocket()
    rocket.stages = stages
    rocket.payload = payload

    return rocket
  }

  createPayload(): Payload {
    return new Payload(0)
  }

  createStages(): Stage[] {
    const engine = new Engine(1000)
    const stage = new Stage([ engine ])
    return [ stage ]
  }
}


type FreightRocketStages = [ FirstStage, SecondStage ]

export class FreightRocketFactory extends RocketFactory {
  private satelliteId: number = 0

  createStages(): FreightRocketStages {
    return [ new FirstStage(), new SecondStage() ]
  }

  createPayload(): Satellite {
    return new Satellite(this.satelliteId++)
  }
}
