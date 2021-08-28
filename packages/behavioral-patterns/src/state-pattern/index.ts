

export namespace StatePattern {

  export class Context {
    private state: State
    private enabledState: StateEnabled = new StateEnabled(this)
    private disabledState: StateDisabled = new StateDisabled(this)

    constructor(public element: HTMLElement) {
      element.addEventListener("mouseenter", () => this.render(true))
      element.addEventListener("mouseleave", () => this.render(false))
      element.addEventListener("click", () => this.click())
      this.render(false)
    }

    private render(hover: boolean) {
      this.state = hover ? this.enabledState : this.disabledState
      this.state.render()
    }

    private click(): void {
      this.state.click()
    }

    onClick(): void {
      console.log("i am clicked")
    }
  }

  export interface State {
    render(): void
    click(): void
  }

  export class StateEnabled implements State {
    constructor(private context: Context) {}

    render() {
      this.context.element.classList.add("hover")
      this.context.element.classList.remove("disabled")
    }

    click() {
      this.context.onClick()
    }
  }

  export class StateDisabled implements State {
    constructor(private context: Context) {}

    render() {
      this.context.element.classList.add("disabled")
      this.context.element.classList.remove("hover")
    }

    click() {

    }
  }
}
