import {isValidPhoneNumber} from "./phone";

describe("valid number tests", () => {
  it("Passes valid password", () => {
    let valid = isValidPhoneNumber("01482815199", test);
    expect(valid).toBeFalsy();

    valid = isValidPhoneNumber("01482 815199", test);
    expect(valid).toBeFalsy();

    valid = isValidPhoneNumber("01482815199", test);
    expect(valid).toBeFalsy();

    valid = isValidPhoneNumber("01482-815199", test);
    expect(valid).toBeFalsy();
  });

  it("Fails invalid password", () => {
    let valid = isValidPhoneNumber("0", test);
    expect(valid).toBeTruthy();

    valid = isValidPhoneNumber("0148281519", test);
    expect(valid).toBeTruthy();

    valid = isValidPhoneNumber("01482 81519", test);
    expect(valid).toBeTruthy();

    valid = isValidPhoneNumber("+44148281519", test);
    expect(valid).toBeTruthy();

    valid = isValidPhoneNumber("qwertuiop", test);
    expect(valid).toBeTruthy();
  });
});
