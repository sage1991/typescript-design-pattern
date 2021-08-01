
export interface Rocket {
  payload: Payload
  stages: Stage[]
}

export interface Payload {
  weight: number
}

export interface Stage {
  engines: Engine[]
}

export class Engine {
  constructor(private thrust: number) {}
}
