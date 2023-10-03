import Joi from "joi";
import { FormValidationError } from "./ClientErrors";

class CredentialsModel {
    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    public static validationSchema = Joi.object({
        email: Joi.string().required().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            .message("Please enter a valid Email address").min(2).max(100).label("Email Address"),
        password: Joi.string().required().min(4).max(128).label("Password")
    });

    public static validate(model: CredentialsModel): void {
        const result = CredentialsModel.validationSchema.validate(model);
        
        if (result.error?.message) throw new FormValidationError(result.error.message, result.error.details);
    }
}

export default CredentialsModel;
