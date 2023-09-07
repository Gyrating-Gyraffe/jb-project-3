require('dotenv').config()

import express from "express";
import cors from "cors";
import dataController from "./6-controllers/data-controller";
import authController from "./6-controllers/auth-controller"
import routeNotFound from "./4-middleware/route-not-found";
import catchAll from "./4-middleware/catch-all";
import appConfig from "./2-utils/app-config";
import expressFileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

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
server.use("/api", [dataController, authController]);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on " + appConfig.domainName));
