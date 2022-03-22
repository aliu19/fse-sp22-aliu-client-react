module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  //
  // // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: 'https://boiling-fjord-65274.herokuapp.com',

  // "moduleDirectories": [
  //   "node_modules",
  //   "src"
  // ],

  // moduleNameMapper: {
  //   "^@/(.*)$": "<rootDir>/src/$1",
  // },

  // "rootDir": "./",
  // "modulePaths": [
  //   "<rootDir>/src"
  // ],

  // moduleNameMapper: {
  //   '^.+\\.(s?css|less|jpg|png|svg)$': 'identity-obj-proxy',
  // },

  // "roots": ["<rootDir>/src/tests/"],

  // "transform": {"\\.[jt]sx?$": "babel-jest"},
};
