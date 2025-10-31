export default (): void => {
    process.env.APP_NAME = "idv-external-case-monitor";
    process.env.LOG_LEVEL = "info";
    process.env.NODE_ENV = "dev";
    process.env.NODE_PORT = "3000";
    process.env.CHS_URL = "http://test.co.uk";
    process.env.API_URL = "http://testapi.co.uk";
};
