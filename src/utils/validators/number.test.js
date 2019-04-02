import {isOnlyNumber, isDecimal} from "./number";

describe("valid number tests", () => {
  it("Passes valid number", () => {
    let valid = isOnlyNumber("1234567890", test);
    expect(valid).toBeFalsy();

    valid = isOnlyNumber("0", test);
    expect(valid).toBeFalsy();

    valid = isOnlyNumber("0987654321", test);
    expect(valid).toBeFalsy();
  });

  it("Fails invalid number", () => {
    let valid = isOnlyNumber("qwertyuiop", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("!£$%^&*()", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("1234567890qwertyuiop", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("qwertuiop1234567890", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("-1234567890qwertyuiop", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("-qwertuiop1234567890", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("1234567890!£$%^&*()", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("!£$%^&*()1234567890", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("-1234567890!£$%^&*()", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("10.10", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("0.00", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("-1234567890", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("-0987654321", test);
    expect(valid).toBeTruthy();
  });

  it("Passes valid decimal", () => {
    let valid = isDecimal("1234567890", test);
    expect(valid).toBeFalsy();

    valid = isDecimal("0", test);
    expect(valid).toBeFalsy();

    valid = isDecimal("0987654321", test);
    expect(valid).toBeFalsy();

    valid = isDecimal("10.10", test);
    expect(valid).toBeFalsy();

    valid = isDecimal("0.00", test);
    expect(valid).toBeFalsy();

    valid = isDecimal("-1234567890", test);
    expect(valid).toBeFalsy();

    valid = isDecimal("-0987654321", test);
    expect(valid).toBeFalsy();

    valid = isDecimal("-1234567890.0", test);
    expect(valid).toBeFalsy();

    valid = isDecimal("-0987654321.00", test);
    expect(valid).toBeFalsy();
  });

  it("Fails invalid decimal", () => {
    let valid = isOnlyNumber("qwertyuiop", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("!£$%^&*()", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("1234567890qwertyuiop", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("qwertuiop1234567890", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("-1234567890qwertyuiop", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("-qwertuiop1234567890", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("1234567890!£$%^&*()", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("!£$%^&*()1234567890", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("-1234567890!£$%^&*()", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("10.10.", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("0..00", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("-1234567890.0.", test);
    expect(valid).toBeTruthy();

    valid = isOnlyNumber("-0987654321..0", test);
    expect(valid).toBeTruthy();
  });
});
