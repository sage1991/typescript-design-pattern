import { RocketBuilder } from "../index"
import {
  FreightRocket,
  FreightRocketFirstStage,
  FreightRocketSecondStage, LiquidRocketStage,
  Satellite
} from "../../rocket/impl/FreightRocket"


type FreightRocketStage = [ FreightRocketFirstStage ] | [ FreightRocketFirstStage, FreightRocketSecondStage ]

export class FreightRocketBuilder extends RocketBuilder<FreightRocket, Satellite> {
  private static FIRST_STAGE_LIMIT_WEIGHT = 1000
  private static FIRST_STAGE_MAXIMUM_FUEL = 1000
  private static SECOND_STAGE_MAXIMUM_FUEL = 1000

  private _rocket: FreightRocket

  createRocket() {
    this._rocket = new FreightRocket()
  }

  addPayload(payload: Satellite) {
    this._rocket.payload = payload
  }

  addStages() {
    const { weight } = this._rocket.payload
    const stages: LiquidRocketStage[] = [ new FreightRocketFirstStage(weight * 4) ]
    if (weight > FreightRocketBuilder.FIRST_STAGE_LIMIT_WEIGHT) {
      stages.push(new FreightRocketSecondStage(weight))
    }
    this._rocket.stages = stages as FreightRocketStage
  }

  refuelRocket() {
    const { payload: { weight }, stages } = this._rocket

    stages[0].refuel(100 * Math.min(weight, FreightRocketBuilder.FIRST_STAGE_MAXIMUM_FUEL) / FreightRocketBuilder.FIRST_STAGE_MAXIMUM_FUEL)
    if (stages[1]) {
      stages[1].refuel(
        100 * (weight - FreightRocketBuilder.FIRST_STAGE_MAXIMUM_FUEL) / ( FreightRocketBuilder.SECOND_STAGE_MAXIMUM_FUEL - FreightRocketBuilder.FIRST_STAGE_MAXIMUM_FUEL )
      )
    }
  }

  get rocket(): FreightRocket {
    return this._rocket
  }
}
