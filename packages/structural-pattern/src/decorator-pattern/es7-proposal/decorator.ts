

type FunctionReturnString = (...args: any[]) => string;

export const prefix = (text: string) => (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<FunctionReturnString>): TypedPropertyDescriptor<FunctionReturnString> => {
  const method = descriptor.value
  if (!method) throw new Error("@prefix must decorating a method")

  return {
    ...descriptor,
    value: function (...args: any[]) {
      return `[${text}] ${method.apply(this, args)}`
    }
  }
}


export const suffix = (text: string) => (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<FunctionReturnString>): TypedPropertyDescriptor<FunctionReturnString> => {
  const method = descriptor.value
  if (!method) throw new Error("@suffix must decorating a method")

  return {
    ...descriptor,
    value: function (...args: any[]) {
      return `${method.apply(this, args)} [${text}]`
    }
  }
}
