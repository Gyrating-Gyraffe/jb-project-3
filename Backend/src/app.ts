require('dotenv').config()

import express from "express";
import cors from "cors";
import dataController from "./6-controllers/data-controller";
import authController from "./6-controllers/auth-controller"
import routeNotFound from "./4-middleware/route-not-found";
import catchAll from "./4-middleware/catch-all";
import appConfig from "./2-utils/app-config";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", [dataController, authController]);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
