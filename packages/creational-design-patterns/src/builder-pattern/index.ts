import { Director } from "./builder"
import { SoundingRocketBuilder } from "./builder/impl/SoundingRocketBuilder"
import { Probe } from "./rocket/impl/SoundingRocket"
import { FreightRocketBuilder } from "./builder/impl/FreightRocketBuilder"
import { Satellite } from "./rocket/impl/FreightRocket"

const director = new Director()

const soundingRocketBuilder = new SoundingRocketBuilder()
const soundingRocket = director.prepare(soundingRocketBuilder, new Probe(100))

const freightRocketBuilder = new FreightRocketBuilder()
const freightRocket = director.prepare(freightRocketBuilder, new Satellite(0, 1200))
