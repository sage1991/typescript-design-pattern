import { Engine, Payload, Rocket, Stage } from "../index"


// concrete implementation for Rocket interface
export class ExperimentalRocket implements Rocket {
  payload: ExperimentalPayload
  stages: [ ExperimentalStage ]
}

export class ExperimentalPayload implements Payload {
  weight: number = 1000
}

export class ExperimentalStage implements Stage {
  engines: Engine[] = [ new Engine(100000) ]
}

