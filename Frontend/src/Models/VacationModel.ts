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

    private static parseDBDateTime(dateTime: string): Date {
        // Split timestamp into [ Y, M, D, h, m, s ]:
        const db = dateTime.toString().split(/[- T Z :]/);

        // Apply each element to the Date UTC function:
        const date = new Date(Date.UTC(+db[0], +db[1] - 1, +db[2], +db[3], +db[4], +db[5]));

        return date;
    }

    public static getVacationDateStrings(startDate: Date, endDate: Date): string {
        const startDateFinal = `${startDate.getDate()}.${startDate.getMonth()}.${startDate.getFullYear()}`;
        const endDateFinal = `${endDate.getDate()}.${endDate.getMonth()}.${endDate.getFullYear()}`;

        return `${startDateFinal} - ${endDateFinal}`;
    }
}

export default VacationModel;