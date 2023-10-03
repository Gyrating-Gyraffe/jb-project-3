import { createStore } from "redux";
import UserModel from "../Models/UserModel";

export class GlobalState {
    public user: UserModel;
    public userFollowIDs: number[];
}

export enum GlobalActionType {
    SetUser = "SetUser",
    SetFollowIDs = "SetFollowIDs"
}

export interface GlobalAction {
    type: GlobalActionType;
    payload?: UserModel | number[];
}

export function globalReducer(currentState: GlobalState, action: GlobalAction): GlobalState {
    const newState = currentState ? (JSON.parse(JSON.stringify(currentState))) : null;
    switch (action.type) {
        case GlobalActionType.SetUser:
            newState.user = action.payload;
            break;
        case GlobalActionType.SetFollowIDs:
            newState.userFollowIDs = action.payload;
            break;
    }
    
    return newState;
}

const globalStore = createStore(globalReducer, { user: null, userFollowIDs: [] } as GlobalState);

export default globalStore;