import { LinearProgress } from "@mui/material";
import "./Loading.css";

function Loading(): JSX.Element {
    return (
        <div className="Loading">
            <LinearProgress color="info" />
            <LinearProgress color="secondary" />
            <LinearProgress color="primary" />
        </div>
    );
}

export default Loading;
