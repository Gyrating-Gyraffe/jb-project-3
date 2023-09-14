import { Request } from "express";
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import UserModel from "../3-models/user-model";
import crypto from "crypto";
import authService from "../5-services/auth-service";

const jwtSecretKey = "HU%vn@fFpv&@6j7R2uy*";

function getNewToken(user: UserModel): string {

    // Remove password from token:
    delete user.password;

    // Create refresh token:
    const refreshTokenOptions = { expiresIn: "7d" };
    const refreshToken = jwt.sign({ user }, jwtSecretKey, refreshTokenOptions);

    // Add refresh token to DB:
    try {
        authService.addRefreshToken(user, refreshToken);
    }
    catch (err: any) {
        console.log(err);
    }

    // Create access token:
    const container = { user };
    const options = { expiresIn: "5s" };
    const accessToken = jwt.sign(container, jwtSecretKey, options);
    return accessToken;
}

// Functions verifyToken and verifyRefreshToken use this type to communicate the result of verification:
type VerificationResult = {
    token: string,
    err: any
}

// Verifies token in HTTP request and returns it if valid:
function verifyToken(request: Request): Promise<VerificationResult> {
    return new Promise<VerificationResult>((resolve, reject) => {
        try {
            const token = request.cookies.access_token;

            // If no access token in cookies:
            if (!token) resolve(null);

            // Verify the token:
            jwt.verify(token, jwtSecretKey, (err: JsonWebTokenError) => {

                // In case of error:
                if (err) {
                    if (err instanceof TokenExpiredError)
                        resolve({ token: token, err: err });
                    else
                        resolve({ token: null, err: err });
                }

                // Token valid:
                resolve({ token: token, err: null });
            });
        }
        catch (err: any) {
            reject(err);
        }
    });
}

// Verifies a given user's refresh token:
function verifyRefreshToken(token: string): Promise<VerificationResult> {
    return new Promise<VerificationResult>((resolve, reject) => {
        try {
            // If no refresh token in database:
            if (!token) resolve(null);

            // Verify the token:
            jwt.verify(token, jwtSecretKey, (err: JsonWebTokenError) => {

                // In case of error:
                if (err) resolve({ token: null, err: err });

                // Token valid:
                resolve({ token: token, err: null });
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
    if (!payload?.user) return;
    return payload.user;
}

// Hash salt: 
const hashSalt = "V&77j#b3RE+vgC!Fg+p6";

// SHA - Secure Hashing Algorithm
// HMAC - Hash based Message Authentication Code

// Hash password: 
function hashPassword(plainText: string): string {
    if (!plainText) return null;

    // Hash with salting: 
    const hashedPassword = crypto.createHmac("sha512", hashSalt).update(plainText).digest("hex");

    return hashedPassword;
}


export default {
    getNewToken,
    verifyToken,
    verifyRefreshToken,
    getUserFromToken,
    hashPassword
};
