
export interface Rocket {
  payload: Payload
}

export interface Payload {
  weight: number
}

export interface Stage {
  engines: Engine[]
}

export class Engine {
  constructor(public thrust: number) {}
}

