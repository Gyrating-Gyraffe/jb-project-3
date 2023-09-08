import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";
import { ForbiddenError, StatusCode, UnauthorizedError } from "../Models/ClientErrors";

class DataService {
    public async getAllVacations(): Promise<VacationModel[]> {
        try {
            const response = await axios.get<VacationModel[]>(appConfig.serverUrl + "vacations",  { withCredentials: true });
            return response.data;
        }
        catch(err: any) { 
            if(err.response) {
                const message = err.response.data;
                const status = err.response.status;
                
                if(status === StatusCode.Unauthorized) throw new UnauthorizedError(message);
                else if(status === StatusCode.Forbidden) throw new ForbiddenError(message);
            }
            else {
                throw new Error(err);
            } 
        }
    }
}

const dataService = new DataService();

export default dataService;
