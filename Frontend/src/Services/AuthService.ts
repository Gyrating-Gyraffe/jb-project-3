import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import appConfig from "../Utils/AppConfig";
import notifyService from "./NotifyService";


class AuthService {
    public async login(credentials: CredentialsModel): Promise<boolean> {
        try {
            const response = await axios.post(appConfig.serverUrl + "auth/login", credentials, { withCredentials: true });

            notifyService.success("Logged in successfully");
            return true;
        }
        catch (err: any) { notifyService.error(err); return false; }
    }
}

const authService = new AuthService();

export default authService;
