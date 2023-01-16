export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
	collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
	coveragePathIgnorePatterns: ["/node_modules/"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"]  
};
