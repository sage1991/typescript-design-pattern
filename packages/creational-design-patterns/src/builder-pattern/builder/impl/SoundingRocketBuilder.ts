import { RocketBuilder } from "../index"
import { Probe, SolidEngine, SoundingRocket } from "../../rocket/impl/SoundingRocket"

export class SoundingRocketBuilder extends RocketBuilder<SoundingRocket, Probe> {
  private _rocket: SoundingRocket

  createRocket() {
    this._rocket = new SoundingRocket()
  }

  addPayload(payload: Probe) {
    this._rocket.payload = payload
  }

  addStages() {
    this._rocket.engine = new SolidEngine(this._rocket.payload.weight)
  }

  get rocket(): SoundingRocket {
    return this._rocket
  }
}
