import * as example from "./exampleModule";
import * as users from "./userAuth";
import * as postcode from "./postcode";
import * as profile from "./profile";
import * as references from "./references";
import * as rentPassport from "./rentPassport";
import * as invites from "./invites";
import * as lease from "./lease";
import * as properties from "./properties";
import * as branches from "./branches";
import * as accounts from "./accounts";
import * as sharePassports from "./sharePassports";
import * as agency from "./agency";
import * as rentPassportAgencies from "./rentPassportAgencies";
import * as agents from "./agents";
import * as agencies from "./agencies";
import * as userNotifications from "./userNotifications";
import * as openBanking from "./openBanking";

export default {
  ...example,
  ...accounts,
  ...agencies,
  ...users,
  ...agents,
  ...postcode,
  ...profile,
  ...references,
  ...rentPassport,
  ...properties,
  ...sharePassports,
  ...invites,
  ...branches,
  ...agency,
  ...rentPassportAgencies,
  ...userNotifications,
  ...lease,
  ...openBanking,
};
