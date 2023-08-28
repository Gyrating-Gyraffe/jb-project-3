import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { ResourceNotFoundError, UnauthorizedError, ValidationError } from "../3-models/client-errors";
import UserModel from "../3-models/user-model";
import CredentialsModel from "../3-models/credentials-model";
import logger from "../2-utils/logger";

async function register(user: UserModel): Promise<string> {

    const error = user.validate();
    if (error) throw new ValidationError(error);

    if (await isEmailTaken(user.email)) throw new ValidationError(`email ${user.email} already taken`);

    user.password = cyber.hashPassword(user.password);

    // Log the new user's registration:
    logger.logActivity(`-New user registered-\n${user.toString()}`);

    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.isAdmin || 'DEFAULT']);
    user.userId = info.insertId;

    const token = cyber.getNewToken(user);

    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    credentials.password = cyber.hashPassword(credentials.password);

    // SQL-Injection secured:
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    const users = await dal.execute(sql, [credentials.email, credentials.password]);

    if (users.length === 0) throw new UnauthorizedError("Incorrect email or password");

    const user = users[0];

    const token = cyber.getNewToken(user);

    return token;
}

async function isEmailTaken(email: string): Promise<boolean> {
    
    const sql = `SELECT COUNT(*) as count FROM users WHERE email = ?`;
    
    // Uses destructuring assignment to get 'count' from the 'RowPacketData' returned object:
    const { count } = (await dal.execute(sql, [email]))[0];

    return count > 0;
}

export default {
    register,
    login
}