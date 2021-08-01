import { RocketFactory } from "../index"
import {
  FreightRocket,
  FreightRocketFirstStage,
  FreightRocketSecondStage,
  Satellite
} from "../../rocket/impl/FreightRocket"


export class FreightRocketFactory implements RocketFactory<FreightRocket> {
  private id: number = 0

  createRocket(): FreightRocket {
    return new FreightRocket()
  }

  createPayload(): Satellite {
    return new Satellite(this.id++, 100)
  }

  createStages(): [ FreightRocketFirstStage, FreightRocketSecondStage ] {
    return [
      new FreightRocketFirstStage(),
      new FreightRocketSecondStage()
    ]
  }
}
