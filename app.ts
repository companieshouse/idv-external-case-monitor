import dotenv from "dotenv";
import express from "express";
import { findAllBacklogs } from "./src/services/identityVerificationService";
import logger from "./src/lib/Logger";
import { StatusCodes } from "http-status-codes";

// Configure dotenv to load .env file from utils folder
dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req: express.Request, res: express.Response) => {
    try {
        logger.info("Received request to retrieve backlog cases");
        const backlog = await findAllBacklogs();
        res.json(backlog);
    } catch (error) {
        logger.error(`Error retrieving backlog cases: ${error}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to retrieve backlog cases" });
    }
});

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
    console.log(`Listening on ${PORT}`);
});
