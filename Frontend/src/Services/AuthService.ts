import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import appConfig from "../Utils/AppConfig";
import notifyService from "./NotifyService";
import UserModel from "../Models/UserModel";


class AuthService {
    public async login(credentials: CredentialsModel): Promise<boolean> {
        try {
            await axios.post(appConfig.serverUrl + "auth/login", credentials, { withCredentials: true });

            notifyService.success("Logged in successfully");
            return true;
        }
        catch (err: any) { notifyService.error(err); return false; }
    }

    public async register(user: UserModel): Promise<boolean> {
        try {
            await axios.post(appConfig.serverUrl + "auth/register", user, { withCredentials: true });

            notifyService.success("Registered successfully");
            return true;
        }
        catch (err: any) { notifyService.error(err); return false; }
    }
}

const authService = new AuthService();

export default authService;
