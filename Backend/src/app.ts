require('dotenv').config()

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import appConfig from "./2-utils/app-config";
import paths from "./2-utils/paths";
import catchAll from "./4-middleware/catch-all";
import expressRateLimit from "./4-middleware/rate-limit";
import authController from "./6-controllers/auth-controller";
import dataController from "./6-controllers/data-controller";
import { routeNotFound, pageNotFound } from "./4-middleware/not-found-middleware";

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
server.use("/", express.static(paths.frontendFolder))
server.use("/api/auth", expressRateLimit);
server.use("/api", [dataController, authController]);
server.use("/api/*", routeNotFound);
server.use("/*", pageNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on " + appConfig.domainName));
