import { Engine, Payload, Rocket, Stage } from "../index"


export class FreightRocket implements Rocket {
  payload: Satellite
  stages: [ FreightRocketFirstStage ] | [ FreightRocketFirstStage, FreightRocketSecondStage ]
}

export class Satellite implements Payload {
  constructor(public id: number, public weight: number) {}
}

export class LiquidEngine extends Engine {
  private fuel: number

  refuel(level: number): void {
    this.fuel = level
  }
}

export abstract class LiquidRocketStage implements Stage {
  constructor(public engines: LiquidEngine[]) {}

  refuel(level: number = 100): void {
    for (let i = 0; i < this.engines.length; i++) {
      this.engines[i].refuel(level)
    }
  }
}

export class FreightRocketFirstStage extends LiquidRocketStage {
  private static createEngines(thrust: number) {
    const ENGINE_NUMBER: number = 4
    const SINGLE_THRUST: number = thrust / ENGINE_NUMBER

    const engines: LiquidEngine[] = []
    for (let i = 0; i < ENGINE_NUMBER; i++) {
      engines.push(new LiquidEngine(SINGLE_THRUST))
    }
    return engines
  }

  constructor(thrust: number) {
    super(FreightRocketFirstStage.createEngines(thrust))
  }
}

export class FreightRocketSecondStage extends LiquidRocketStage {
  constructor(thrust: number) {
    super([ new LiquidEngine(thrust) ])
  }
}
