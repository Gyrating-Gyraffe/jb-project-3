import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import appConfig from "../Utils/AppConfig";
import notifyService from "./NotifyService";
import UserModel from "../Models/UserModel";
import authStore, { AuthActionType } from "../Redux/AuthState";
import sessionHandler from "../Utils/SessionHandler";


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

            // Update Redux state:
            authStore.dispatch({ type: AuthActionType.SetState, payload: returnedUser });

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

            // Update Redux state:
            authStore.dispatch({ type: AuthActionType.SetState, payload: returnedUser });

            if(!sessionHandler.isFirstSessionLoad()) {
                notifyService.success(`Welcome back, ${returnedUser.firstName}`);
                sessionHandler.isFirstSessionLoad(true);
            }

            return returnedUser || false;
        }
        catch(err: any) { 
            if(sessionHandler.isFirstSessionLoad()) {
                notifyService.error(err); 
                sessionHandler.isFirstSessionLoad(false);
            }
            return false; 
        }
    }

    public async logout(): Promise<boolean> {
        try {
            const response = await axios.post(appConfig.serverUrl + "auth/logout", "", { withCredentials: true });

            // Status other than 204(No content) means we failed to log out:
            if(response.status !== 204) return false;

            // Update Redux state:
            authStore.dispatch({ type: AuthActionType.SetState, payload: null });

            notifyService.success(`Logged out successfully`);
            return true;
        }
        catch(err: any) { notifyService.error(err); return false; }
    }
}

const authService = new AuthService();

export default authService;
