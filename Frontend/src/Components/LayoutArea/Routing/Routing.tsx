import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import EditVacation from "../../DataArea/EditVacation/EditVacation";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vacations/new" element={<EditVacation />} />
            <Route path="/vacations/:id" element={<EditVacation />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
