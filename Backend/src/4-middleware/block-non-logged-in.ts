import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-errors";

async function blockNonLoggedIn(request: Request, response: Response, next: NextFunction) {
    try {
        const token = await cyber.verifyToken(request);
        if(!token) throw new UnauthorizedError("You are not logged in");
        next();
    }
    catch(err: any) {
        next(err);
    }
}

export default blockNonLoggedIn;

