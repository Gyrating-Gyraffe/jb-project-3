import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import Loading from "../Loading/Loading";
import { Typography } from "@mui/material";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    authService.logout()
        .then(() => { navigate("/home") })
        .catch(err => notifyService.error(err));

    return (
        <div className="Logout">
            <Loading />

            <Typography variant="h5">Logging out...</Typography>
        </div>
    );
}

export default Logout;
