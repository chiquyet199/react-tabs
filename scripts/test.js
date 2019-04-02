/* eslint-disable arrow-parens */
// this file came from https://github.com/facebookincubator/create-react-app
// Do this as the first thing so that any code reading it knows the right env.
const switchSnapshots = require("./switchSnapshots");
const doneSwitchSnapshots = require("./doneSwitchSnapshots");

const isNative = process.argv.includes("--n");
process.env.BABEL_ENV = isNative ? "test:native" : "test:web";
process.env.NODE_ENV = "test";
process.env.PUBLIC_URL = "";
process.env.REACT_APP_MOCK_BACKEND = true;

console.log("Node Environment: " + process.env.NODE_ENV);
console.log("Babel Environment: " + process.env.BABEL_ENV);
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});
// Ensure environment variables are read.
require("../config/env");

const jest = require("jest");

const argv = isNative ? process.argv.slice(3) : process.argv.slice(2);

switchSnapshots(isNative);

// Watch unless on CI or in coverage mode
// if (!process.env.CI && argv.indexOf('--coverage') < 0) {
//   argv.push('--watch');
// }
jest.run(argv).then(() => {
  doneSwitchSnapshots(isNative);
});
