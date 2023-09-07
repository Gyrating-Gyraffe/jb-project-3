import { Request } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import UserModel from "../3-models/user-model";
import crypto from "crypto";

const jwtSecretKey = "HU%vn@fFpv&@6j7R2uy*";

function getNewToken(user: UserModel): string {

    // Remove password from token:
    delete user.password;
    
    const container = { user };
    const options = { expiresIn: "3h" };
    const token = jwt.sign(container, jwtSecretKey, options);
    return token;
}

// Verifies token in HTTP request and returns it if valid:
function verifyToken(request: Request): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
        try {
            const token = request.cookies.access_token;
            
            if (!token) {
                resolve(null);
                return;
            }
            jwt.verify(token, jwtSecretKey, (err: JsonWebTokenError) => {
                if (err) {
                    resolve(null);
                    return;
                }
                resolve(token);
            });
        }
        catch (err: any) {
            reject(err);
        }
    });
}

// Gets token string and returns user:
function getUserFromToken(token: string): UserModel {
    const payload = jwt.decode(token) as JwtPayload;

    // If no payload or no user in payload return:
    if(!payload?.user) return;
    return payload.user; 
}

// Hash salt: 
const hashSalt = "V&77j#b3RE+vgC!Fg+p6";

// SHA - Secure Hashing Algorithm
// HMAC - Hash based Message Authentication Code

// Hash password: 
function hashPassword(plainText: string): string {
    if(!plainText) return null;

    // Hash with salting: 
    const hashedPassword = crypto.createHmac("sha512", hashSalt).update(plainText).digest("hex");

    return hashedPassword;
}

export default {
    getNewToken,
    verifyToken,
    getUserFromToken,
    hashPassword
};
