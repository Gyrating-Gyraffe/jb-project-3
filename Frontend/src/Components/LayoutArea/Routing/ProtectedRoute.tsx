import { Navigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import notifyService from "../../../Services/NotifyService";
import { ForbiddenError, UnauthorizedError } from "../../../Models/ClientErrors";

type ProtectedRouteProps = {
    element: JSX.Element,
    authLevel: 0 | 1,
    user: UserModel,
}

function ProtectedRoute(props: ProtectedRouteProps): JSX.Element {

    // Check if Auth Level requires admin access:
    if (props.authLevel > 0) {
        // No logged in user:
        if (!props.user) {
            notifyService.error(new UnauthorizedError("You must log in to view this page"));
            return <Navigate to={"/login"} />;
        }

        // If user is admin let them through, if not, navigate home:
        if(props.user.isAdmin) {
            return props.element;
        }
        else {
            notifyService.error(new ForbiddenError("You are not allowed to view this page"));
            return <Navigate to={"/home"} />
        }
    }

    // If no user navigate to login:
    if (!props.user) {
        notifyService.error(new UnauthorizedError("You must log in to view this page"));
        return <Navigate to={"/login"} />;
    }

    // Return requested element:
    return props.element;
}

export default ProtectedRoute;