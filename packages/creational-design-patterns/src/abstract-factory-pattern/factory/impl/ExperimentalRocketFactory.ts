import { ExperimentalPayload, ExperimentalRocket, ExperimentalStage } from "../../rocket/impl/ExperimentalRocket"
import { RocketFactory } from "../index"

export class ExperimentalRocketFactory implements RocketFactory<ExperimentalRocket> {
  createRocket(): ExperimentalRocket {
    return new ExperimentalRocket()
  }

  createStages(): [ ExperimentalStage ] {
    return [ new ExperimentalStage() ]
  }

  createPayload(): ExperimentalPayload {
    return new ExperimentalPayload()
  }
}
