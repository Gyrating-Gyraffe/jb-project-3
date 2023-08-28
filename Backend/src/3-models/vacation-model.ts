import Joi from "joi";

class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public imageName: string;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().integer().positive().optional(),
        destination: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2).max(1000),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
        price: Joi.number().required().positive(),
        imageName: Joi.string().optional().allow('')
    });

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default VacationModel;