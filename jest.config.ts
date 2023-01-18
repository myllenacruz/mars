import { pathsToModuleNameMapper } from "ts-jest";

export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(
		{
			"@vehicle/*": ["vehicle/*"]
		},
		{ prefix: "<rootDir>/src/" }
	),
	collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
	coveragePathIgnorePatterns: ["/node_modules/"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"]  
};
