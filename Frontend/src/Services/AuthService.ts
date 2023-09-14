import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import appConfig from "../Utils/AppConfig";
import notifyService from "./NotifyService";
import UserModel from "../Models/UserModel";


class AuthService {
    public async login(credentials: CredentialsModel): Promise<UserModel | boolean> {
        try {
            const response = await axios.post(appConfig.serverUrl + "auth/login", credentials, { withCredentials: true });

            const returnedUser: UserModel = response.data;

            notifyService.success("Logged in successfully");
            return returnedUser || false;
        }
        catch (err: any) { notifyService.error(err); return false; }
    }

    public async register(user: UserModel): Promise<UserModel | boolean> {
        try {
            const response = await axios.post(appConfig.serverUrl + "auth/register", user, { withCredentials: true });

            const returnedUser: UserModel = response.data;

            notifyService.success("Registered successfully");
            return returnedUser || false;
        }
        catch (err: any) { notifyService.error(err); return false; }
    }

    // Sends a request with an empty body. Request is checked in the server for an access token cookie, and a user model is returned if valid:
    public async relog(): Promise<UserModel | boolean> {
        try {
            const response = await axios.post(appConfig.serverUrl + "auth/relog", "", { withCredentials: true });

            const returnedUser: UserModel = response.data;

            notifyService.success(`Welcome back, ${returnedUser.firstName}`);
            return returnedUser || false;
        }
        catch(err: any) { notifyService.error(err); return false; }
    }
}

const authService = new AuthService();

export default authService;
