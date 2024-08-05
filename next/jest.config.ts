import { JestConfigWithTsJest } from "ts-jest";

export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/node_modules/"],
    coverageDirectory: "<rootDir>/coverage",
    coverageReporters: ["json", "lcov", "text"],
} satisfies JestConfigWithTsJest;
