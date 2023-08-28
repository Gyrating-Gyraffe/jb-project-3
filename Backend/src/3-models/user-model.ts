import Joi from "joi";
import uuid from "../2-utils/uuid";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public isAdmin?: number; // 0 or 1 bool.

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
    }

    public static validationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(30),
        lastName: Joi.string().required().min(2).max(100),
        email: Joi.string().required().min(2).max(100),
        password: Joi.string().required().min(4).max(128),
        isAdmin: Joi.number().optional().min(0).max(1)
    });

    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }

    /** Converts the user model to a string representation but excludes the password.
     */
    public toString(): string {
        return `User ID: 0x${this.userId}\n`+
                `First Name: ${this.firstName}\n`+
                `Last Name: ${this.lastName}\n`+
                `Email: ${this.email}\n`+
                `Admin Privileges: ${this.isAdmin ? "Yes" : "No"}`;
    }
}

export default UserModel;