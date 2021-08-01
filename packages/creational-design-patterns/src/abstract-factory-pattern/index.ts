import { Client } from "./factory"
import { ExperimentalRocketFactory } from "./factory/impl/ExperimentalRocketFactory"
import { FreightRocketFactory } from "./factory/impl/FreightRocketFactory"


const client = new Client()
const experimentalRocketFactory = new ExperimentalRocketFactory()
const experimentalRocket = client.buildRocket(experimentalRocketFactory)

const freightRocketFactory = new FreightRocketFactory()
const freightRocket = client.buildRocket(freightRocketFactory)
