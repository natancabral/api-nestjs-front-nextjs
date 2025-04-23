export default {
  preset: "ts-jest",
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*[\\.-]spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  testEnvironment: "node",
  transformIgnorePatterns: ["<rootDir>/node_modules"],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  modulePathIgnorePatterns: ["<rootDir>/node_modules"],
  coveragePathIgnorePatterns: ["<rootDir>/node_modules"],

  moduleNameMapper: {
    "^@root/(.*)$": "<rootDir>/src/$1",
    "^@common/(.*)$": "<rootDir>/src/common/$1",
    "^@services/(.*)$": "<rootDir>/src/modules/services/$1",
    "^@repositories/(.*)$": "<rootDir>/src/modules/repositories/$1",
    "^@https/(.*)$": "<rootDir>/src/modules/https/$1",
  },
  moduleDirectories: ["node_modules", "src"],
};
