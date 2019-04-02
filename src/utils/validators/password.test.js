import {isValidPassword, matchesConfirmPassword} from "./password";

describe("valid number tests", () => {
  it("Passes valid password", () => {
    let valid = isValidPassword("qwertyu*", test);
    expect(valid).toBeFalsy();

    valid = isValidPassword("qwertyu*", test);
    expect(valid).toBeFalsy();

    valid = isValidPassword("*qwertyu", test);
    expect(valid).toBeFalsy();

    valid = isValidPassword("qwer*tyu", test);
    expect(valid).toBeFalsy();

    valid = isValidPassword("1234567890^", test);
    expect(valid).toBeFalsy();

    valid = isValidPassword("Aq1!Wv2%", test);
    expect(valid).toBeFalsy();
  });

  it("Fails invalid password", () => {
    let valid = isValidPassword("qwertyu", test);
    expect(valid).toBeTruthy();

    valid = isValidPassword("qwerty*", test);
    expect(valid).toBeTruthy();

    valid = isValidPassword("!£$%^&*()", test);
    expect(valid).toBeTruthy();

    valid = isValidPassword("123*", test);
    expect(valid).toBeTruthy();

    valid = isValidPassword("*123", test);
    expect(valid).toBeTruthy();

    valid = isValidPassword("1*23", test);
    expect(valid).toBeTruthy();
  });

  it("Passes matched passwords", () => {
    const valid = matchesConfirmPassword("qwertyuiop*", test, {
      confirmPassword: "qwertyuiop*",
    });
    expect(valid).toBeFalsy();
  });

  it("Fails unmatched passwords", () => {
    const valid = matchesConfirmPassword("qwertyuiop", test, {
      confirmPassword: "qwertyuiop*",
    });
    expect(valid).toBeTruthy();
  });
});
