import { NextFunction, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../3-models/client-errors";
import ExpandedRequest from "../3-models/expanded-request";
import authService from "../5-services/auth-service";
import appConfig from "../2-utils/app-config";

async function blockNonAdmin(request: ExpandedRequest, response: Response, next: NextFunction) {

    // Skip this Auth middleware in a test environment:
    if(appConfig.isTest) return next();

    try {

        // Pull user from request:
        const { user } = request;      

        // Throw 401:
        if(!user) throw new UnauthorizedError("You are not logged in");

        // Use AuthService to query DB if user is admin:
        const isAdmin = await authService.isAdmin(user);

        // Throw 403:
        if(!isAdmin) throw new ForbiddenError("You are not allowed to perform this action");

        next();
    }
    catch(err: any) {
        next(err);
    }    
}

export default blockNonAdmin;
