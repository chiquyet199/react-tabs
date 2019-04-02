import "jest-enzyme";

global.console.error = output => {
  console.log(output); // eslint-disable-line
  throw new Error(`Console.error triggered: ${output}`);
};

global.console.warn = output => {
  console.log(output); // eslint-disable-line
  throw new Error(`Console.warn triggered: ${output}`);
};
