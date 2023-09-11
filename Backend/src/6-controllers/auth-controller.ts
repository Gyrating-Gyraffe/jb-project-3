import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../3-models/credentials-model";
import UserModel from "../3-models/user-model";
import authService, { AuthResult } from "../5-services/auth-service";

const router = express.Router();

router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const result: AuthResult = await authService.register(user);

        // Don't pass user ID and isAdmin to client
        delete result.user.userId;
        delete result.user.isAdmin;

        response.cookie('access_token', result.token, { httpOnly: true, secure: true });
        response.status(201).json(result.user);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const result: AuthResult = await authService.login(credentials);

        // Don't pass user ID and isAdmin to client
        delete result.user.userId;
        delete result.user.isAdmin;

        response.cookie('access_token', result.token, { httpOnly: true, secure: true });
        response.status(200).json(result.user);
    }
    catch(err: any) {
        next(err);
    }
});

// The refresh API is in stealth - It *should not throw errors*, only notify on success.
router.post("/auth/refresh", async (request: Request, response: Response, next: NextFunction) => {
    try {     
        const user: UserModel = await authService.refresh(request);
        if(!user) next();

        // Don't pass user ID and isAdmin to client
        delete user.userId;
        delete user.isAdmin;

        response.status(200).json(user);
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
