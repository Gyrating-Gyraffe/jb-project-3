import { NextFunction, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import cyber from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-errors";
import ExpandedRequest from "../3-models/expanded-request";
import authService from "../5-services/auth-service";

async function requireToken(request: ExpandedRequest, response: Response, next: NextFunction) {
    try {
        // Verify access token:
        const result = await cyber.verifyToken(request);

        // User has no access token at all:
        if (!result?.token) throw new UnauthorizedError("You are not logged in");
        // User has an access token but it failed verification:
        else if (result.err) throw result.err;

        next();
    }
    catch (err: any) {
        // Access Token is expired:
        if (err instanceof TokenExpiredError) {

            // Handle expired token, if succeeds - save new access token:
            const newToken = await handleExpiredToken(request);

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
async function handleExpiredToken(request: ExpandedRequest): Promise<string | null> {
    try {
        // Get the encoded user object and client-specific UUID from expanded request:
        const { user, clientUUID } = request;

        // Get the refresh token that matches this access token:
        const refreshToken = await authService.getRefreshToken(user, clientUUID);
        
        // Verify the refresh token:
        const result = await cyber.verifyRefreshToken(refreshToken);

        // If no token or there's an error in result:
        if (!result?.token || result.err) return null;

        // Generate a new access/refresh token pair and save the new access token:
        const newToken = cyber.getNewToken(user, clientUUID);

        request.clientUUID = clientUUID;

        return newToken;
    }
    catch (err: any) {
        return null;
    }
}

export default requireToken;

