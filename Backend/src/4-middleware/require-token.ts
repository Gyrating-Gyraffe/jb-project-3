import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-errors";
import { TokenExpiredError } from "jsonwebtoken";
import UserModel from "../3-models/user-model";
import authService from "../5-services/auth-service";

async function requireToken(request: Request, response: Response, next: NextFunction) {
    try {
        const result = await cyber.verifyToken(request);
        if (!result?.token) throw new UnauthorizedError("You are not logged in");
        else if (result.err) throw result.err;

        next();
    }
    catch (err: any) {
        // Access Token is expired:
        if (err instanceof TokenExpiredError) {
            const token = request.cookies.access_token;

            // Access token is expired:
            const newToken = await handleExpiredToken(token);

            // Failed to receive a new access token:
            if(!newToken) { 
                // Stop this function and go on with an unauthorized error:
                next(new UnauthorizedError('Your session expired'));
                return;
            }
            
            // If we got a new access token set it in response cookies:
            response.cookie('access_token', newToken, { httpOnly: true, secure: true });
            next();
        }
        else
            next(err);
    }
}

// Handles communications with cyber in case of an expired token:
async function handleExpiredToken(token: string): Promise<string | null> {
    try {
        const user: UserModel = cyber.getUserFromToken(token);
        const refreshToken = await authService.getRefreshToken(user);
        console.log("REFRESH: ",refreshToken);
        
        const result = await cyber.verifyRefreshToken(refreshToken);

        if (!result?.token || result.err) return null;

        const newToken = cyber.getNewToken(user);

        return newToken;
    }
    catch (err: any) {
        console.log("BLEH", err);
        return null;
    }
}

export default requireToken;

