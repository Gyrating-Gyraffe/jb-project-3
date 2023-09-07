export class TokenState {
    public accessToken: string = "";
    public refreshToken: string = "";
}

export enum TokenActionType {
    SetToken = "SetToken",
    GetToken = "GetToken",
    DeleteToken = "DeleteToken"
}

export interface TokenAction {
    type: TokenActionType;
    payload: any;
}

export function tokenReducer(currentState: TokenState, action: TokenAction): TokenState {
    const newState = (currentState);
    switch (action.type) {
        case TokenActionType.SetToken:
            
            break;
        case TokenActionType.GetToken:

            break;
        case TokenActionType.DeleteToken:

            break;
    }

    return newState;
}