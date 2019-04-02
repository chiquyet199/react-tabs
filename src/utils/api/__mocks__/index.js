import {injectMocks, extractScenarioFromLocation} from "data-mocks";
import example from "./test-mocks";
import users from "./users";

let scenario;

const {NODE_ENV} = process.env;

if (NODE_ENV !== "test") {
  scenario = extractScenarioFromLocation(window.location);
}

injectMocks(
  {
    default: [...example, ...users.default],
    failedSignup: [...users.failedSignup],
    takenEmail: [...users.takenEmail],
    failedToSendResetToken: [...users.failedToSendResetToken],
  },
  scenario,
);
