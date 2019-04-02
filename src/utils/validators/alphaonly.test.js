import {isValidAlpha} from "./alphaonly";

describe("valid alpha tests", () => {
  it("Passes valid alpha", () => {
    let valid = isValidAlpha("qwertyuiop", test);
    expect(valid).toBeFalsy();

    valid = isValidAlpha("QWERTYUIOP", test);
    expect(valid).toBeFalsy();

    valid = isValidAlpha("QwertyuioP", test);
    expect(valid).toBeFalsy();

    valid = isValidAlpha("qWERTYUIOp", test);
    expect(valid).toBeFalsy();

    valid = isValidAlpha("QwErTyUiOp", test);
    expect(valid).toBeFalsy();
  });

  it("Fails invalid alpha", () => {
    let valid = isValidAlpha("!qwertyuiop", test);
    expect(valid).toBeTruthy();

    valid = isValidAlpha("1qwertyuiop", test);
    expect(valid).toBeTruthy();

    valid = isValidAlpha("qwertyuiop!", test);
    expect(valid).toBeTruthy();

    valid = isValidAlpha("qwertyuiop1", test);
    expect(valid).toBeTruthy();

    valid = isValidAlpha("qwert!yuiop", test);
    expect(valid).toBeTruthy();

    valid = isValidAlpha("qwert1yuiop", test);
    expect(valid).toBeTruthy();
  });
});
