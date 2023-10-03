import Joi from "joi";
import { FormValidationError } from "./ClientErrors";

class VacationModel {
    public vacationId?: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public imageUrl: string;
    public followerCount?: number;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = new Date(vacation.startDate);
        this.endDate = new Date(vacation.endDate);
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.followerCount = vacation.followerCount || 0;
    }

    public static getVacationDateStrings(startDate: Date, endDate: Date): string {
        const startDateFinal = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
        const endDateFinal = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;

        return `${startDateFinal} - ${endDateFinal}`;
    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().integer().positive().optional().label("Vacation Id"),
        destination: Joi.string().required().min(2).max(100).trim().regex(/[a-z\d\-_\s]+/i).label("Destination"),
        description: Joi.string().required().min(2).max(1000).trim().regex(/[a-z\d\-_\s]+/i).label("Description"),
        startDate: Joi.date().iso().required().label("Start Date"),
        endDate: Joi.date().iso().min(Joi.ref('startDate')).message("End Date can't be earlier than Start Date").required().label("End Date"),
        price: Joi.number().required().positive().max(10000).label("Price"),
        imageUrl: Joi.string().optional().allow('').label("Image URL"),
        image: Joi.object().optional().label("Image"),
        followerCount: Joi.number().required().default(0).min(0).label("Follower Count")
    });

    public static validate(model: VacationModel): void {
        const result = VacationModel.validationSchema.validate(model);
        if(result.error?.message) throw new FormValidationError(result.error.message, result.error.details);
    }

}

export default VacationModel;