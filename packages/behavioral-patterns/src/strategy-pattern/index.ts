

export namespace StrategyPattern {

  type TargetType = "A" | "B"

  export type Target = TargetA | TargetB

  export interface TargetA {
    type: "A"
    result: string
  }

  export interface TargetB {
    type: "B"
    value: number
  }

  interface Strategy<T extends Target> {
    operationX(target: T): void
    operationY(target: T): void
  }

  const strategyA: Strategy<TargetA> = {
    operationX(target: TargetA) {
      target.result += target.result
    },
    operationY(target: TargetA) {
      target.result = target.result.substr(Math.floor(target.result.length / 2))
    }
  }

  const strategyB: Strategy<TargetB> = {
    operationX(target: TargetB) {
      target.value *= 2
    },
    operationY(target: TargetB) {
      target.value = Math.floor(target.value / 2)
    }
  }

  export const strategies: { [type in TargetType]: Strategy<Target> } = {
    A: strategyA,
    B: strategyB
  }
}

const targets: StrategyPattern.Target[] = [
  { type: "A", result: "123" },
  { type: "A", result: "456" },
  { type: "B", value: 123 }
]

for (let i = 0; i < targets.length; i++) {
  const { type } = targets[i]

  console.log(targets[i])

  const strategy = StrategyPattern.strategies[type]
  strategy.operationX(targets[i])
  strategy.operationY(targets[i])
  strategy.operationY(targets[i])
  strategy.operationY(targets[i])

  console.log(targets[i])
}
