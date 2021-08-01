import { Engine, Payload, Rocket } from "../index"


export class SoundingRocket implements Rocket {
  payload: Probe
  engine: SolidEngine
}

export class Probe implements Payload {
  constructor(public weight: number) {}
}

export class SolidEngine extends Engine {}
