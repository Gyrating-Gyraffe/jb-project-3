require('dotenv').config()

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import appConfig from "../src/2-utils/app-config";
import catchAll from "../src/4-middleware/catch-all";
import { routeNotFound } from "../src/4-middleware/not-found-middleware";
import expressRateLimit from "../src/4-middleware/rate-limit";
import authController from "../src/6-controllers/auth-controller";
import dataController from "../src/6-controllers/data-controller";
import testInject from "./test-inject";
import { testDataController } from "./6-controllers/data-controller.test";

/**
 * APP TEST
 * Must be identical to app.ts, except for the *ADDITION* of test-related middleware.
 * When using in test environment must make sure that no app.ts features are TAKEN AWAY from here.
 * Only expanding on app.ts is allowed.
 */

const server = express();

// CORS options for allowing the sending of token cookie:
const corsOptions = {
    origin: appConfig.origin, // Replace with your frontend's origin
    credentials: true, // Allow credentials (cookies)
};

server.use(cors(corsOptions));
server.use(cookieParser());
server.use(express.json());
server.use(expressFileUpload());

// Use Inject Mock User middleware for testing. 
// Binding the context to the singleton ensures access to its required properties:
server.use("/api", testInject.injectMockUser.bind(testInject));

// Route middleware must come after test injection middleware:
server.use("/api/auth", expressRateLimit);
server.use("/api", [dataController, authController]);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("TEST MODE >> Listening on " + appConfig.domainName));

// Perform the tests in order:
testDataController();


export default {
    server
}
