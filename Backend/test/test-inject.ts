import { NextFunction, Response } from "express";
import ExpandedRequest from "../src/3-models/expanded-request";
import UserModel from "../src/3-models/user-model";

// Various DI middleware for testing:
class TestInject {

    // Mock user for testing:
    public mock_user: UserModel;

    // Inject this context's mock user into an ExpandedRequest to simulate an authenticated in user:
    public injectMockUser(request: ExpandedRequest, response: Response, next: NextFunction) {
        if(this.mock_user) request.user = this.mock_user;
        next();
    }

}

const testInject = new TestInject();
export default testInject;