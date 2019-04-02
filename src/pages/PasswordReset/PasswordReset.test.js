import {passwordSchema} from "../../schemas/PasswordSchema";
import {Platform} from "react-native";
import {passwordForgetAndReset} from "../../utils/locales/en-US.js";

describe("Password Reset page", () => {
  it(`contains correct snapshot on ${Platform.OS}`, () => {
    const schema = passwordSchema(passwordForgetAndReset);
    expect(schema).toMatchSnapshot();
  });
});
