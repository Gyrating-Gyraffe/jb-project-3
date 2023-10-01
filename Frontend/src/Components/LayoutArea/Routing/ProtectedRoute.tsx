import { Navigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";

type ProtectedRouteProps = {
    element: JSX.Element,
    authLevel: 0 | 1,
    user: UserModel,
}

function ProtectedRoute(props: ProtectedRouteProps): JSX.Element {
    
    // Check if Auth Level requires admin access:
    if(props.authLevel > 0) {
        // No logged in user:
        if(!props.user) return <Navigate to={"/login"} />;

        // If user is admin let them through, if not, navigate home:
        return props.user.isAdmin ? props.element : <Navigate to={"/home"} />;
    }

    // If no user navigate to login:
    return props.user ? props.element : <Navigate to={"/login"} />;
}

export default ProtectedRoute;