export namespace ChainOfResponsibility {

  const foo = () => {
    let random = Math.random()

    if (random < 0.5) {
      throw new Error("Some Error")
    }

    throw new TypeError("Some Type Error")
  }

  const bar = () => {
    try {
      foo()
    } catch (e) {
      if (e instanceof TypeError) {
        console.log("catch type error", e)
        return
      }
      throw e
    }
  }

  const baz = () => {
    try {
      bar()
    } catch (e) {
      console.log("catch error", e)
    }
  }

  baz()

  type RequestType = "help" | "feedback"
  interface Request {
    type: RequestType
  }

  class Handler {
    constructor(private successor?: Handler) {}

    handle(request: Request): void {
      if (this.successor) {
        this.successor.handle(request)
      }
    }
  }

  class HelpHandler extends Handler {
    handle(request: Request) {
      if (request.type === "help") {
        console.log("handle help")
        return
      }
      super.handle(request)
    }
  }

  class FeedbackHandler extends Handler {
    handle(request: Request) {
      if (request.type === "feedback") {
        console.log("handle feedback")
        return
      }
      super.handle(request)
    }
  }
}
