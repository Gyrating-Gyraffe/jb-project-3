import { NextFunction, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../3-models/client-errors";
import ExpandedRequest from "../3-models/expanded-request";
import authService from "../5-services/auth-service";

async function blockNonAdmin(request: ExpandedRequest, response: Response, next: NextFunction) {
    try {
        const { user } = request;      

        if(!user) throw new UnauthorizedError("You are not logged in");

        const isAdmin = await authService.isAdmin(user);

        if(!isAdmin) throw new ForbiddenError("You are not allowed to perform this action");

        next();
    }
    catch(err: any) {
        next(err);
    }    
}

export default blockNonAdmin;
