import Joi from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public imageUrl: string;
    public image: UploadedFile;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image;
    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().integer().positive().optional(),
        destination: Joi.string().required().min(2).max(100).trim().regex(/[a-z\d\-_\s]+/i),
        description: Joi.string().required().min(2).max(1000).trim().regex(/[a-z\d\-_\s]+/i),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
        price: Joi.number().required().positive(),
        imageUrl: Joi.string().optional().allow(''),
        image: Joi.object().optional()
    });

    public validate(): void {
        const result = VacationModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default VacationModel;