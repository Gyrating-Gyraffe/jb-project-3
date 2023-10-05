import { Request } from "express";
import UserModel from "../3-models/user-model";

export default interface ExpandedRequest extends Request{ 
    user?: UserModel;
    clientUUID?: string;
    isLogout?: boolean; 
}