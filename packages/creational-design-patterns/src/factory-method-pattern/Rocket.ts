
export class Rocket {
  payload: Payload
  stages: Stage[]
}


export class Payload {
  constructor(private weight: number) {}
}

export class Satellite extends Payload {
  constructor(private id: number) {
    super(200);
  }
}


export class Stage {
  constructor(private engines: Engine[]) {}
}

export class FirstStage extends Stage {
  constructor() {
    super([
      new Engine(1000),
      new Engine(1000),
      new Engine(1000),
      new Engine(1000)
    ])
  }
}

export class SecondStage extends Stage {
  constructor() {
    super([ new Engine(1000) ])
  }
}


export class Engine {
  constructor(private thrust: number) {}
}
