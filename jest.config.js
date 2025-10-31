module.exports = {
    roots: ["<rootDir>"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    collectCoverageFrom: ["src/**/*.ts"],
    coveragePathIgnorePatterns: ["/src/bin/"],
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    testMatch: ["**/test/**/*.test.[jt]s"],
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {
            diagnostics: false
        }]
    },
    globalSetup: "./test/setup.ts",
    moduleNameMapper: {
        "^axios$": require.resolve("axios")
    }
};
