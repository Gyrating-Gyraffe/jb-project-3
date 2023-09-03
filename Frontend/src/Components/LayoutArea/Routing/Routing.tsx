import { Navigate, Route, Routes } from "react-router-dom";
import Insert from "../../DataArea/Insert/Insert";
import List from "../../DataArea/List/List";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/insert" element={<Insert />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
