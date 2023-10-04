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
import VacationList from "../../DataArea/VacationList/VacationList";
import VacationListAdmin from "../../AdminArea/VacationListAdmin/VacationListAdmin";
import Logout from "../Logout/Logout";

function Routing(): JSX.Element {
    const user = useSelector((state: GlobalState) => state.user);

    return (
        <Routes>
            {/* Public Routes, available to guests and logged in users: */}
            <Route path="/home" element={<Home user={user} />} />
            <Route path="/register" element={<Register user={user} />} />
            <Route path="/login" element={<Login user={user} />} />

            {/* User Routes, available to anyone logged in: */}
            <Route path="/vacations" element={<ProtectedRoute user={user} element={<VacationList />} authLevel={0} />} />
            <Route path="/vacations/album/:id" element={<ProtectedRoute user={user} element={<VacationAlbum />} authLevel={0} />} />
            <Route path="/logout" element={<ProtectedRoute user={user} element={<Logout />} authLevel={0} />}/>

            {/* Admin Routes, available only to level 1 access users: */}
            <Route path="/admin/dashboard" element={<ProtectedRoute user={user} element={<AdminDashboard />} authLevel={1} />} />
            <Route path="/admin/vacations" element={<ProtectedRoute user={user} element={<VacationListAdmin />} authLevel={1} />} />
            <Route path="/admin/vacations/new" element={<ProtectedRoute user={user} element={<EditVacation />} authLevel={1} />} />
            <Route path="/admin/vacations/edit/:id" element={<ProtectedRoute user={user} element={<EditVacation />} authLevel={1} />} />

            {/* Utility Routes: */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
            <Route path="/not-found" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
