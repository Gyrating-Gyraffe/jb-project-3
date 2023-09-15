import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../3-models/credentials-model";
import UserModel from "../3-models/user-model";
import authService, { AuthResult } from "../5-services/auth-service";
import requireToken from "../4-middleware/require-token";
import ExpandedRequest from "../3-models/expanded-request";
import StatusCode from "../3-models/status-code";

const router = express.Router();

const authCookieOptions = { httpOnly: true, secure: true };

router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const result: AuthResult = await authService.register(user);

        // Don't pass user ID to client:
        delete result.user.userId;

        response.cookie('access_token', result.token, authCookieOptions);
        response.status(StatusCode.Created).json(result.user);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const result: AuthResult = await authService.login(credentials);

        // Don't pass user ID to client:
        delete result.user.userId;

        response.cookie('access_token', result.token, authCookieOptions);
        response.json(result.user);
    }
    catch(err: any) {
        next(err);
    }
});

// The relog API is in stealth - It *should not throw errors*, only notify on success.
router.post("/auth/relog", requireToken, async (request: ExpandedRequest, response: Response, next: NextFunction) => {
    try {     
        const user: UserModel = await authService.relog(request);
        if(!user) return;

        // Don't pass user ID to client:
        delete user.userId;

        response.json(user);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/auth/logout", requireToken, async (request: ExpandedRequest, response: Response, next: NextFunction) => {
    try {
        // Get user object and client UUID from request:
        const { user, clientUUID } = request;

        // Log out using identifiers:
        const result = await authService.logout(user, clientUUID);

        if(!result) { 
            console.log(`Couldn't log out user: ${user.email} with a refresh token client UUID of: ${clientUUID}`);
            throw new Error(`An error has occured while logging you out, please try again`); 
        }

        response.cookie('access_token', '', { ...authCookieOptions, maxAge: 0 });
        response.status(StatusCode.NoContent).send();
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
