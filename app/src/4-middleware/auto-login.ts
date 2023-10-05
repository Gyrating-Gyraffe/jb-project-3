import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

/** Auto Login Middleware: Logs user in automatically if a valid access token exists.
 */
async function autoLogin(request: Request, response: Response, next: NextFunction) {
    
}

export default autoLogin;

