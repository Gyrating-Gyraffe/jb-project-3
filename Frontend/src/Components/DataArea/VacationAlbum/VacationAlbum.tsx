import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";

function VacationAlbum(): JSX.Element {

    const navigate = useNavigate();

    // Get ID from route params (Can be undefined, when adding a new vacation):
    const { id } = useParams();

    const [vacation, setVacation] = useState<VacationModel>();

    // On init:
    useEffect(() => {

        // If we have ID, get vacation:
        if (id) {
            dataService.getVacation(+id)
                .then(res => setVacation(new VacationModel(res)))
                .catch(() => { notifyService.error('Not found'); navigate("/home"); });
        }
    }, []);

    // Render the images 9 times without duplicating the vacation object
    const renderImagesMultipleTimes = () => {
        if (!vacation) return <></>;

        const images = [];

        for (let i = 0; i < 9; i++) {
            images.push(
                <ImageListItem key={i} sx={{ border: 5, borderColor: 'white' }}>
                    <img
                        srcSet={`https://source.unsplash.com/random?${vacation.destination.split(',')[0]}&id=${i} 2x`}
                        src={`https://source.unsplash.com/random?${vacation.destination.split(',')[0]}&id=${i}`}
                        alt={vacation.destination}
                        loading="lazy"
                    />
                </ImageListItem>
            );
        }

        return images;
    };

    return (
        <Box sx={{ py: 10, width: 'auto', maxWidth: '80%', margin: 'auto', backgroundColor: '#ababab', boxShadow: 'inset 5px 5px 25px grey' }}>
            <Typography variant="h2">
                {vacation && vacation.destination}
            </Typography>
            <ImageList sx={{ width: 'auto', maxWidth: '80%', margin: 'auto', padding: 15 }}
                variant="masonry" cols={3} gap={8}>
                {renderImagesMultipleTimes()}
            </ImageList>
        </Box>
    );
}

export default VacationAlbum;
