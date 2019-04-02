/* eslint-disable quote-props, quotes */

module.exports = {
  rootDir: "../../",
  coveragePathIgnorePatterns: [
    "<rootDir>/src/index",
    "<rootDir>/src/utils/routing/",
    "<rootDir>/src/components/Picker/WebPicker.js",
    "<rootDir>/node_modules/",
  ],
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  setupFiles: ["<rootDir>/config/jest/initTest.js"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.js?(x)",
    "<rootDir>/src/**/?(*.)(spec|test).js?(x)",
  ],
  testEnvironment: "node",
  transform: {
    "^.+\\.(mjs|jsx|js)$": "babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
  },
  snapshotSerializers: [
    "enzyme-to-json/serializer",
    "react-native-web/jest/serializer",
  ],
  setupTestFrameworkScriptFile: "<rootDir>/scripts/setupjest.js",
  verbose: true,
  coverageDirectory: "coverageWeb",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native-material-textfield)/)(?!(react-native-web-linear-gradient)/)(?!(react-native-snap-carousel)/)(?!(react-native-collapsible)/)(?!(react-native-config)/)",
  ],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
  },
  moduleFileExtensions: ["web.js", "js", "json", "web.jsx", "jsx", "node"],
  testURL: "http://localhost",
};
