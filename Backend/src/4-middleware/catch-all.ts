import { NextFunction, Request, Response } from "express";
import appConfig from "../2-utils/app-config";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    
    // Display error: 
    if(!appConfig.isTest) console.log(err);

    // Find status code: 
    const statusCode = err.status || 500; // Short Circuit

    // Send back error details to frontend:
    response.status(statusCode).send(err.message);
}

export default catchAll;
