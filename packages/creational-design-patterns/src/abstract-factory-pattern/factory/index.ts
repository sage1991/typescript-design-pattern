import { Payload, Rocket, Stage } from "../rocket"


export interface RocketFactory<T extends Rocket> {
  createRocket(): T
  createPayload(): Payload
  createStages(): Stage[]
}


export class Client {
  buildRocket<T extends Rocket>(factory: RocketFactory<T>): T {
    const rocket = factory.createRocket()
    rocket.payload = factory.createPayload()
    rocket.stages = factory.createStages()
    return rocket
  }
}
