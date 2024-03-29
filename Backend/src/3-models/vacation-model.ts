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
    public followerCount: number;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = new Date(vacation.startDate);
        this.endDate = new Date(vacation.endDate);
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image;
        this.followerCount = vacation.followerCount;
    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().integer().positive().optional(),
        destination: Joi.string().required().min(2).max(100).trim().regex(/[a-z\d\-_\s]+/i),
        description: Joi.string().required().min(2).max(1000).trim().regex(/[a-z\d\-_\s]+/i),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
        price: Joi.number().required().positive().max(10000),
        imageUrl: Joi.string().optional().allow(''),
        image: Joi.object().optional(),
        followerCount: Joi.number().required().default(0).min(0)
    });

    public validate(): void {
        const result = VacationModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default VacationModel;