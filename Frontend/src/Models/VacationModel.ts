class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public imageUrl: string;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = this.parseDBDateTime(vacation.startDate.toString());
        this.endDate = this.parseDBDateTime(vacation.endDate.toString());
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
    }

    private parseDBDateTime(dateTime: string): Date {
        // Split timestamp into [ Y, M, D, h, m, s ]:
        const db = dateTime.toString().split(/[- T Z :]/);

        // Apply each element to the Date UTC function:
        const date = new Date(Date.UTC(+db[0], +db[1] - 1, +db[2], +db[3], +db[4], +db[5]));

        return date;
    }

    public getVacationDateStrings(): string {
        const startDate = `${this.startDate.getDate()}.${this.startDate.getMonth()}.${this.startDate.getFullYear()}`;
        const endDate = `${this.endDate.getDate()}.${this.endDate.getMonth()}.${this.endDate.getFullYear()}`;

        return `${startDate} - ${endDate}`;
    }
}

export default VacationModel;