import { createStore } from "redux";

export class AuthState {
    public loggedIn: boolean;
}

export enum AuthActionType {
    SetState = "SetState",
    GetState = "GetState"
}

export interface AuthAction {
    type: AuthActionType;
    payload?: boolean;
}

export function authReducer(currentState: AuthState, action: AuthAction): AuthState {
    const newState = (currentState);
    switch (action.type) {
        case AuthActionType.SetState:
            newState.loggedIn = !!action.payload;
            break;
        case AuthActionType.GetState:

            break;
    }
    console.log(newState);
    
    return newState;
}

export const authStore = createStore(authReducer, {loggedIn: false});