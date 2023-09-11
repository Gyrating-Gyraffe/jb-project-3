import { createStore } from "redux";
import UserModel from "../Models/UserModel";

export class AuthState {
    public user: UserModel;
}

export enum AuthActionType {
    SetState = "SetState",
    GetState = "GetState"
}

export interface AuthAction {
    type: AuthActionType;
    payload?: UserModel;
}

export function authReducer(currentState: AuthState, action: AuthAction): AuthState {
    const newState = (JSON.parse(JSON.stringify(currentState)));
    switch (action.type) {
        case AuthActionType.SetState:
            newState.user = action.payload;
            break;
        case AuthActionType.GetState:

            break;
    }
    console.log(newState);
    
    return newState;
}