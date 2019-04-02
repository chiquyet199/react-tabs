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
  coverageDirectory: "coverageNative",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native)/)(?!(react-native-snap-carousel)/)(?!(react-router-native)/)(?!(react-native-read-more-text)/)(?!(react-native-linear-gradient)/)(?!(react-native-tab-view)/)(?!(react-native-svg)/)(?!(react-native-collapsible)/)(?!(react-native-config)/)",
  ],
  moduleFileExtensions: [
    "index.ios.js",
    "index.android.js",
    "js",
    "json",
    "jsx",
    "node",
  ],
  preset: "react-native",
};
