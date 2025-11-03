
import { createPrivateApiClient } from "private-api-sdk-node";
import PrivateApiClient from "private-api-sdk-node/dist/client";
import { createLocalApiKeyClient } from "../../../src/services/apiClientService";
import { IHttpClient } from "@companieshouse/api-sdk-node";

jest.mock("private-api-sdk-node");
jest.mock("@companieshouse/api-sdk-node");
jest.mock("../../../src/lib/Logger");



describe("createPrivateApiKeyClient", () => {
    it("should return private Key API client", () => {
    // Given
        const privateApiClient: PrivateApiClient = new PrivateApiClient({} as IHttpClient, {} as IHttpClient);
        (createPrivateApiClient as jest.Mock).mockReturnValue(privateApiClient);
        // When
        const result = createLocalApiKeyClient();
        // Then
        expect(result).toBeInstanceOf(PrivateApiClient);
    });
});
