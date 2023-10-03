import { FormValidationError } from "../Models/ClientErrors";

export type ValidationState = Record<string, boolean>;

class FormValidator {


    public handleError(err: any, oldValidationState: ValidationState): ValidationState {

        // In case of form validation error, use the ValidationState object to show the user which field is invalid:
        if (err instanceof FormValidationError) {

            err.message = err.message.replaceAll('"', '');

            // Copy the old validation state:
            const validationState: ValidationState = {...oldValidationState};

            // Set all values in the new validation state copy to true (valid):
            for(const key in oldValidationState) {
                validationState[key] = true;
            }

            // Any values in validation state that match the keys given in error are set to false (invalid):
            for (const details of err.errorItem) {
                const key = details.context.key;
                
                if (validationState[key]) validationState[key] = false;
            }

            return validationState;
        }

        return oldValidationState;
    }

}

const formValidator = new FormValidator();
export default formValidator;