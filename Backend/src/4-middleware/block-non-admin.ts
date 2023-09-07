import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import { ForbiddenError, UnauthorizedError } from "../3-models/client-errors";
import UserModel from "../3-models/user-model";

async function blockNonAdmin(request: Request, response: Response, next: NextFunction) {
    try {
        const token = await cyber.verifyToken(request);
        const user: UserModel = cyber.getUserFromToken(token);
        

        if(!token || !user) throw new UnauthorizedError("You are not logged in");

        const sql = `SELECT * FROM users WHERE userId = ? AND isAdmin = 1`;
        const result = await dal.execute(sql, [user.userId]);

        if(result.length === 0) throw new ForbiddenError("You are not allowed to perform this action");

        next();
    }
    catch(err: any) {
        next(err);
    }    
}

export default blockNonAdmin;
