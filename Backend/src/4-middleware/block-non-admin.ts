import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { ForbiddenError, UnauthorizedError } from "../3-models/client-errors";
import UserModel from "../3-models/user-model";
import authService from "../5-services/auth-service";

async function blockNonAdmin(request: Request, response: Response, next: NextFunction) {
    try {
        const { token } = await cyber.verifyToken(request);
        const user: UserModel = cyber.getUserFromToken(token);
        

        if(!token || !user) throw new UnauthorizedError("You are not logged in");

        const isAdmin = await authService.isAdmin(user);

        if(!isAdmin) throw new ForbiddenError("You are not allowed to perform this action");

        next();
    }
    catch(err: any) {
        next(err);
    }    
}

export default blockNonAdmin;
