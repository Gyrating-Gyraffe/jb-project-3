import Joi from "joi";
import { FormValidationError } from "./ClientErrors";

class UserModel {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public isAdmin?: number; // 0 or 1 bool.

    public constructor(user: UserModel) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
    }

    public static validationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive().label("User Id"),
        firstName: Joi.string().required().min(2).max(30).pattern(/^[a-z]+$/i)
            .message("First name must be between 2 to 30 characters. Alphabetical letters only.").label("First Name"),
        lastName: Joi.string().required().min(2).max(100).pattern(/^[a-z]+$/i)
            .message("Last name must be between 2 to 100 characters. Alphabetical letters only.").label("Last Name"),
        email: Joi.string().required().min(2).max(100).regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            .message("Please enter a valid Email address").label("Email Address"),
        password: Joi.string().required().min(4).max(128).label("Password"),
        isAdmin: Joi.number().optional().min(0).max(1)
    });

    public static validate(model: UserModel): void {
        const result = UserModel.validationSchema.validate(model);
        if (result.error?.message) throw new FormValidationError(result.error.message, result.error.details);
    }

}

export default UserModel;