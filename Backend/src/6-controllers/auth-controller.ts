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

        response.cookie('access_token', token, { httpOnly: true, secure: true });
        response.status(201).send();
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);

        response.cookie('access_token', token, { httpOnly: true, secure: true });
        response.status(200).send();
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/auth/logout", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = await authService.logout(request.cookies.access_token);

        response.cookie('access_token', token, { httpOnly: true, secure: true });
        response.status(200).send();
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
