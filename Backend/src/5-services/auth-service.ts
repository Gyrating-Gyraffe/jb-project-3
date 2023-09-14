import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import logger from "../2-utils/logger";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import CredentialsModel from "../3-models/credentials-model";
import UserModel from "../3-models/user-model";
import { Request } from "express";

export type AuthResult = {
    token: string,
    user: UserModel
}

async function register(user: UserModel): Promise<AuthResult> {
    const error = user.validate();

    if (error) throw new ValidationError(error);

    if (await isEmailTaken(user.email)) throw new ValidationError(`Email is already registered`);

    user.password = cyber.hashPassword(user.password);

    // Log the new user's registration:
    logger.logActivity(`-New user registered-\n${user.toString()}`);

    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.isAdmin || 'DEFAULT']);
    user.userId = info.insertId;

    const token = cyber.getNewToken(user);

    return { token: token, user: user };
}

async function login(credentials: CredentialsModel): Promise<AuthResult> {

    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    credentials.password = cyber.hashPassword(credentials.password);

    // SQL-Injection secured:
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    const users = await dal.execute(sql, [credentials.email, credentials.password]);

    if (users.length === 0) throw new UnauthorizedError("Incorrect email or password");

    const user = users[0];

    const token = cyber.getNewToken(user);

    return { token: token, user: user };
}

async function logout(token: string): Promise<string> {




    return token;
}

// Used to relog the user with the access token cookie:
async function relog(request: Request): Promise<UserModel> {
    const { token } = await cyber.verifyToken(request);
    if (!token) return null;

    const user = cyber.getUserFromToken(token);
    return user;

}

// Check the database if a given user (User Model) is an admin:
async function isAdmin(user: UserModel): Promise<boolean> {
    if (!user?.userId) return null;

    const sql = `SELECT * FROM users WHERE userId = ? AND isAdmin = 1`;
    const result = await dal.execute(sql, [user.userId]);

    // Turn resulting array (from DB query) into a boolean value:
    return !!result;

}

// Adds a refresh token related to a given user:
async function addRefreshToken(user: UserModel, token: string): Promise<boolean> {
    if (!user?.userId) return null;

    // SQL Query first deletes existing tokens for the given user, then inserts a new one:
    // NOTE: MySQL supports atomicity - these two actions either both fail or both succeed.
    const sql = `DELETE FROM refresh_tokens WHERE userId = ?;
                INSERT INTO refresh_tokens VALUES(DEFAULT, ?, ?);`;
    const info: OkPacket = await dal.execute(sql, [user.userId, token, user.userId]);

    const insertId = info.insertId;

    return !!insertId;
}

// Gets the refresh token matching the user's id. If none, returns null:
async function getRefreshToken(user: UserModel): Promise<string> {
    if (!user?.userId) return null;

    const sql = `SELECT token FROM refresh_tokens WHERE userId = ?`;
    const response = await dal.execute(sql, [user.userId]);

    const refreshToken = response[0].token;

    return refreshToken || null;
}

// Check database to see if a given email is taken:
async function isEmailTaken(email: string): Promise<boolean> {

    const sql = `SELECT COUNT(*) as count FROM users WHERE email = ?`;

    // Uses destructuring assignment to get 'count' from the 'RowPacketData' returned object:
    const { count } = (await dal.execute(sql, [email]))[0];

    return count > 0;
}


export default {
    register,
    login,
    logout,
    relog,
    isAdmin,
    getRefreshToken,
    addRefreshToken
}