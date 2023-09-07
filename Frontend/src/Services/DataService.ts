import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";

class DataService {
    public async getAllVacations(): Promise<VacationModel[]> {
        try {
            const response = await axios.get<VacationModel[]>(appConfig.serverUrl + "vacations",  { withCredentials: true });
            return response.data;
        }
        catch(err: any) { throw new Error(err)}
    }
}

const dataService = new DataService();

export default dataService;
