import { EventEmitter } from "events"


class Thigh {}  // 허벅지
class Shank {}  // 정강이
class Foot {}   // 발

class Leg {
  thigh: Thigh = new Thigh()
  shank: Shank = new Shank()
  foot: Foot = new Foot()
  motionController: MotionController = new MotionController(this)
  feedbackController: FeedbackController = new FeedbackController(this.foot)

  constructor() {
    this.feedbackController.on("touch", () => {
      // do something...
    })
  }
}

class MotionController {
  constructor(public leg: Leg) {}

  setAngle(angle: number): void {
    let { foot, shank, thigh } = this.leg
    // do something...
  }
}

class FeedbackController extends EventEmitter {
  constructor(public foot: Foot) {
    super()
  }
}


class Robot {
  leftLegMotion: MotionController
  rightLegMotion: MotionController

  leftFootFeedback: FeedbackController
  rightFootFeedback: FeedbackController

  walk(steps: number): void {

  }

  jump(strength: number): void {

  }
}
