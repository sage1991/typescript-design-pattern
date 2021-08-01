import { Engine, Payload, Rocket, Stage } from "../index"


export class FreightRocket implements Rocket {
  payload: Satellite
  stages: [ FreightRocketFirstStage, FreightRocketSecondStage ]
}

export class Satellite implements Payload {
  constructor(private id: number, public weight: number) {}
}

export class FreightRocketFirstStage implements Stage {
  engines: [ Engine, Engine, Engine, Engine ]
}

export class FreightRocketSecondStage implements Stage {
  engines: [ Engine, Engine ]
}
