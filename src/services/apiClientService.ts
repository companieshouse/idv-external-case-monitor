import {
    CHS_INTERNAL_API_KEY,
    INTERNAL_API_URL
} from "../lib/constants";
import PrivateApiClient from "private-api-sdk-node/dist/client";
import { createPrivateApiClient } from "private-api-sdk-node";

export const createLocalApiKeyClient = (): PrivateApiClient => {
    return createPrivateApiClient(CHS_INTERNAL_API_KEY, undefined, INTERNAL_API_URL);
};
