import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthState } from "../../../Redux/AuthState";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import EditVacation from "../../DataArea/EditVacation/EditVacation";
import Home from "../../HomeArea/Home/Home";
import Loading from "../Loading/Loading";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";

function Routing(): JSX.Element {
    const user = useSelector((state: AuthState) => state.user);

    return (
        <Routes>
            <Route path="/home" element={<ProtectedRoute user={user} element={<Home />} authLevel={0} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/vacations/new" element={<ProtectedRoute user={user} element={<EditVacation />} authLevel={1} />} />
            <Route path="/vacations/edit/:id" element={<ProtectedRoute user={user} element={<EditVacation />} authLevel={1} />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
            <Route path="/not-found" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
