import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { GlobalState } from "../../../Redux/GlobalState";
import AdminDashboard from "../../AdminArea/AdminDashboard/AdminDashboard";
import EditVacation from "../../AdminArea/EditVacation/EditVacation";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import VacationAlbum from "../../DataArea/VacationAlbum/VacationAlbum";
import Home from "../../HomeArea/Home/Home";
import Loading from "../Loading/Loading";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";

function Routing(): JSX.Element {
    const user = useSelector((state: GlobalState) => state.user);
    const userFollowIDs = useSelector((state: GlobalState) => state.userFollowIDs);

    return (
        <Routes>
            <Route path="/home" element={<ProtectedRoute user={user} element={<Home user={user} />} authLevel={0} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/vacations/new" element={<ProtectedRoute user={user} element={<EditVacation />} authLevel={1} />} />
            <Route path="/vacations/edit/:id" element={<ProtectedRoute user={user} element={<EditVacation />} authLevel={1} />} />
            <Route path="/vacations/album/:id" element={<VacationAlbum />} />
            <Route path="/admin" element={<ProtectedRoute user={user} element={<AdminDashboard />} authLevel={1} />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
            <Route path="/not-found" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
