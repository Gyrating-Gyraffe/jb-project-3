import { CardContent, CardMedia } from "@mui/material";
import "./VacationAlbum.css";
import VacationModel from "../../../Models/VacationModel";

type VacationAlbumProps = {
    vacation: VacationModel;
}


function VacationAlbum(props: VacationAlbumProps): JSX.Element {
    return (
        <CardContent>
            <CardMedia
                component="img"
                height="300"
                image={`https://source.unsplash.com/random?${props.vacation.destination.split(',')[0]}`}
                alt="green iguana"
            />

        </CardContent>
    );
}

export default VacationAlbum;
