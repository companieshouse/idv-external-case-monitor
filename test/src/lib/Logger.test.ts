import ApplicationLogger from "@companieshouse/structured-logging-node/lib/ApplicationLogger";


describe("Logger", () => {
    const oldEnv = process.env;
    const mockLogger = {} as ApplicationLogger;
    const mockCreateLogger = jest.fn();
    const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();

    beforeAll(() => {
        mockCreateLogger.mockReturnValue(mockLogger);
        jest.doMock("@companieshouse/structured-logging-node", () => ({
            createLogger: mockCreateLogger
        }));
    });

    afterAll(() => {
        jest.dontMock("@companieshouse/structured-logging-node");
        mockConsoleLog.mockRestore();
        process.env = oldEnv;
    });

    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
        process.env = { ...oldEnv };
        mockConsoleLog.mockClear();
    });

    it.each([
        ["custom APP_NAME", "custom-app-name", "debug", "custom-app-name", "env.LOG_LEVEL set to debug"],
        ["default APP_NAME", undefined, "info", "idv-external-case-monitor", "env.LOG_LEVEL set to info"],
        ["empty APP_NAME", "", "error", "", "env.LOG_LEVEL set to error"]
    ])(
        "should create logger with %s",
        async (_desc, appName, logLevel, expectedAppName, expectedLogMessage) => {
            // Given
            if (appName === undefined) {
                delete process.env.APP_NAME;
            } else {
                process.env.APP_NAME = appName;
            }

            if (logLevel === undefined) {
                delete process.env.LOG_LEVEL;
            } else {
                process.env.LOG_LEVEL = logLevel;
            }

            // When
            const logger = (await import("../../../src/lib/Logger")).default;

            // Then
            expect(mockCreateLogger).toHaveBeenCalledWith(expectedAppName);
            expect(mockConsoleLog).toHaveBeenCalledWith(expectedLogMessage);
            expect(logger).toBe(mockLogger);
        }
    );

    it("should export the logger instance created by createLogger", async () => {
    // Given
        process.env.APP_NAME = "test-app";
        process.env.LOG_LEVEL = "test";

        // When
        const logger = (await import("../../../src/lib/Logger")).default;

        // Then
        expect(logger).toBe(mockLogger);
        expect(typeof logger).toBe("object");
    });

    it("should call console.log exactly once during module import", async () => {
    // Given
        process.env.LOG_LEVEL = "test-level";

        // When
        await import("../../../src/lib/Logger");


        // Then
        expect(mockConsoleLog).toHaveBeenCalledTimes(1);
        expect(mockConsoleLog).toHaveBeenCalledWith("env.LOG_LEVEL set to test-level");
    });
});
