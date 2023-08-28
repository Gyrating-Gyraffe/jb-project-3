import express, { Request, Response, NextFunction } from "express";
import UserModel from "../3-models/user-model";
import CredentialsModel from "../3-models/credentials-model";
import authService from "../5-services/auth-service";
import blockNonLoggedIn from "../4-middleware/block-non-logged-in";

const router = express.Router();

router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authService.register(user);
        response.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);
        response.json(token);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
