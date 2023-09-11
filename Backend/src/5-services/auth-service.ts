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

// Used to refresh the logged-in status of the user with the access token cookie:
async function refresh(request: Request): Promise<UserModel> {
    const token = await cyber.verifyToken(request);
    if(!token) return null;

    const user = cyber.getUserFromToken(token);
    return user;
}

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
    refresh
}