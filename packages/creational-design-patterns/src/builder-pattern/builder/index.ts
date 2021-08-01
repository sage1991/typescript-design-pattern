import { Payload, Rocket } from "../rocket"


export abstract class RocketBuilder<R extends Rocket, P extends Payload> {
  abstract get rocket(): R
  createRocket(): void {}
  addPayload(payload: P): void {}
  addStages(): void {}
  refuelRocket(): void {}
}

export class Director {
  prepare<R extends Rocket, P extends Payload>(builder: RocketBuilder<R, P>, payload: P): R {
    builder.createRocket()
    builder.addPayload(payload)
    builder.addStages()
    builder.refuelRocket()
    return builder.rocket
  }
}
