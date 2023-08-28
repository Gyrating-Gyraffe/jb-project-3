import StatusCode from "./status-code";

export class ClientError {
    public constructor(public message: string, public status: number) { }
}

export class RouteNotFoundError extends ClientError {
    public constructor(route: string) {
        super(`Route ${route} does not exist`, StatusCode.NotFound);
    }
}

export class ResourceNotFoundError extends ClientError {
    public constructor(id: string | number) {
        super(`Id: ${id} does not exist`, StatusCode.NotFound);
    }
}

export class ListNotFoundError extends ClientError {
    public constructor() {
        super(`There's nothing in requested list`, StatusCode.NotFound);
    }
}

export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(message, StatusCode.BadRequest);
    }
}

export class UnauthorizedError extends ClientError {
    public constructor(message: string) {
        super(message, StatusCode.Unauthorized);
    }
}

export class ForbiddenError extends ClientError {
    public constructor(message: string) {
        super(message, StatusCode.Forbidden);
    }
}