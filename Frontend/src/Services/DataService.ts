import axios from "axios";
import { ForbiddenError, StatusCode, UnauthorizedError } from "../Models/ClientErrors";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";

class DataService {
    public async getAllVacations(): Promise<VacationModel[]> {
        try {
            const response = await axios.get<VacationModel[]>(appConfig.serverUrl + "vacations", { withCredentials: true });

            // Vacations as they are in the database:
            const dbVacations = response.data;

            // Remap database vacations to client-specific vacation models:
            const clientVacations = dbVacations.map(vacation => new VacationModel(vacation));

            return clientVacations;
        }
        catch (err: any) {
            this.catchErr(err);
        }
    }

    public async getVacation(vacationId: number): Promise<VacationModel> {
        try {
            const response = await axios.get<VacationModel>(appConfig.serverUrl + "vacations/" + vacationId, { withCredentials: true });
            return response.data;
        }
        catch (err: any) {
            this.catchErr(err);
        }
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        try {
            const formData = this.createFormData(vacation);

            // Append the image file:
            if (vacation.imageUrl) {
                const imageBlob = await fetch(vacation.imageUrl).then((response) => response.blob());
                formData.append("image", imageBlob, "image.jpg");
            }

            const response = await axios.post<VacationModel>(appConfig.serverUrl + "vacations", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            return response.data;
        }
        catch (err: any) {
            this.catchErr(err);
        }
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        try {
            const formData = this.createFormData(vacation);

            // Append the image file:
            if (vacation.imageUrl) {
                const imageBlob = await fetch(vacation.imageUrl).then((response) => response.blob());
                formData.append("image", imageBlob, "image.jpg");
            }       

            const response = await axios.patch<VacationModel>(appConfig.serverUrl + `vacations/${vacation.vacationId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
        }
        catch (err: any) {
            this.catchErr(err);
        }
    }

    public async deleteVacation(vacationId: number): Promise<boolean> {
        try {
            const response = await axios.delete<boolean>(appConfig.serverUrl + `vacations/${vacationId}`, { withCredentials: true });

            return response.status === StatusCode.NoContent;
        }
        catch(err: any) {
            this.catchErr(err);
        }
    }

    public async followVacation(vacationId: number): Promise<boolean> {
        try {
            const response = await axios.post<boolean>(appConfig.serverUrl + `vacations/${vacationId}/follow`, null, { withCredentials: true });
            return response.data;
        }
        catch (err: any) {
            this.catchErr(err);
        }
    }

    // Get IDs of vacations the user follows:
    public async getUserFollowIDs(): Promise<number[]> {
        try {
            const response = await axios.get<number[]>(appConfig.serverUrl + `/followids`, { withCredentials: true });
            return response.data;
        }
        catch (err: any) {
            this.catchErr(err);
        }
    }


    private catchErr(err: any) {
        if (err.response) {
            const message = err.response.data;
            const status = err.response.status;

            if (status === StatusCode.Unauthorized) throw new UnauthorizedError(message);
            else if (status === StatusCode.Forbidden) throw new ForbiddenError(message);
        }
        else {
            throw new Error(err);
        }
    }

    private createFormData(vacation: VacationModel): FormData {
        const formData = new FormData();

        // Append vacation data to FormData:
        if(vacation.vacationId)
            formData.append("vacationId", vacation.vacationId.toString());
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate.toISOString());
        formData.append("endDate", vacation.endDate.toISOString());
        formData.append("price", vacation.price.toString());
        formData.append("followerCount", vacation.followerCount.toString())
        formData.append("imageUrl", vacation.imageUrl);

        return formData;
    }
}

const dataService = new DataService();

export default dataService;
