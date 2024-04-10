import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

describe("ValueObject Unit Tests", () => {
  test("should be equals", () => {
    const ValueObject1 = new StringValueObject("test");
    const ValueObject2 = new StringValueObject("test");
    expect(ValueObject1.equals(ValueObject2)).toBe(true);
  });

  test("should not be equals", () => {
    const ValueObject1 = new StringValueObject("test");
    const ValueObject2 = new StringValueObject("test2");
    expect(ValueObject1.equals(ValueObject2)).toBe(false);
  });

  
});

