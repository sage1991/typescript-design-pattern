import chai from "chai";
import { getLength } from "../index";

chai.should()
describe("some feature", () => {
  it("should pass", () => {
    "foo".should.not.equal("bar")
  })

  it("should error", () => {
    (() => {
      throw new Error()
    }).should.throw()
  })

  it("'abc' should have length 3", () => {
    getLength("abc").should.equal(3)
  })

  it("'' should have length 0", () => {
    getLength("").should.equal(0)
  })
})
