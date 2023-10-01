/* --- NOTES: Decoding access tokens for UUID might create overhead as project scales. */
import crypto from "crypto";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import ExpandedRequest from "../3-models/expanded-request";
import UserModel from "../3-models/user-model";
import authService from "../5-services/auth-service";
import uuid from "./uuid";
import { UnauthorizedError } from "../3-models/client-errors";

const jwtSecretKey = "HU%vn@fFpv&@6j7R2uy*";

export interface TokenPair {
    access_token: string;
    refresh_token: string;
    clientUUID?: string;
}

interface AuthTokenPayload {
    user: UserModel;
    clientUUID: string
}

async function getNewTokenPair(user: UserModel, oldUUID?: string): Promise<TokenPair> {

    // No old UUID means we're registering or logging in:
    if (!oldUUID) oldUUID = 'new';

    // Remove password from token:
    delete user.password;

    // Generate a client-specific UUID for the tokens:
    const clientUUID = uuid.generate();

    // Payload for the tokens:
    const payload = { user, clientUUID } as AuthTokenPayload;

    // Create refresh token:
    const refreshTokenOptions = { expiresIn: "7d" };
    const refreshToken = jwt.sign(payload, jwtSecretKey, refreshTokenOptions);

    // Add refresh token to DB:
    try {
        await authService.addRefreshToken(user, oldUUID, clientUUID, refreshToken);
    }
    catch (err: any) {
        console.log(err);
    }

    // Create access token:
    const accessTokenOptions = { expiresIn: "10m" };
    const accessToken = jwt.sign(payload, jwtSecretKey, accessTokenOptions);

    return { access_token: accessToken, refresh_token: refreshToken, clientUUID: clientUUID };
}

// Functions verifyToken and verifyRefreshToken use this type to communicate the result of verification:
type VerificationResult = {
    token: string,
    err: any
}

// Verifies token in HTTP request and returns it if valid:
function verifyTokens(request: ExpandedRequest): Promise<VerificationResult> {
    return new Promise<VerificationResult>((resolve, reject) => {
        try {
            const accessToken = request.cookies.access_token;
            const refreshToken = request.cookies.refresh_token;
            

            // If no refresh token in cookies:
            if (!refreshToken) { resolve(null) }
            // If no access token in cookies:
            if (!accessToken) {
                // Verify the refresh token:
                jwtVerify(request, refreshToken)
                    .then(result => {
                        // Refresh token couldn't be verified:
                        if (result.err || !result.token) {
                            throw new UnauthorizedError('You are not logged in');
                        }
                        resolve(result);
                    })
                    .catch(err => reject(err));
            }

            // Verify the access token:
            jwtVerify(request, accessToken)
                .then(result => resolve(result))
                .catch(err => reject(err));
        }
        catch (err: any) {
            reject(err);
        }
    });
}

function jwtVerify(request: ExpandedRequest, token: string): Promise<VerificationResult> {
    return new Promise<VerificationResult>((resolve) => {
        // Verify the token:
        jwt.verify(token, jwtSecretKey, (err: JsonWebTokenError, decoded: AuthTokenPayload) => {

            // Save the user object and clientUUID in the expanded request:
            saveTokenPayloadToRequest(decoded, request);

            // In case of error:
            if (err) {
                if (err instanceof TokenExpiredError) {
                    // Force a decode for expired token:
                    decoded = jwt.decode(token) as AuthTokenPayload;

                    // Save the user object and clientUUID in the expanded request:
                    saveTokenPayloadToRequest(decoded, request);

                    resolve({ token: token, err: err });
                }
                else
                    resolve({ token: null, err: err });
            }

            // Token valid:
            resolve({ token: token, err: null });
        });
    })
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

// Gets decoded token and saves payload and saves user object in request params (In case required by middleware):
function saveTokenPayloadToRequest(decoded: AuthTokenPayload, request: ExpandedRequest): void {

    // Partial or missing payload:
    if (!decoded?.user || !decoded?.clientUUID) return;

    // Add user object to request:
    request.user = decoded.user;

    // Add clientUUID to request:
    request.clientUUID = decoded.clientUUID;
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
    getNewTokenPair,
    verifyTokens,
    verifyRefreshToken,
    hashPassword
};
