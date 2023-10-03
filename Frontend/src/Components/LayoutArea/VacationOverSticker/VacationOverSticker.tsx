import { Box, Typography } from "@mui/material";
import "./VacationOverSticker.css";

type VacationOverStickerProps = {
    endDate: Date;
}

function VacationOverSticker(props: VacationOverStickerProps): JSX.Element {

    if(new Date() < props.endDate) return;

    return (
        <div className="VacationOverSticker">
            <Box sx={{ width: 600, height: 20, zIndex: '5', bgcolor: '#d52e24' }} />
            <Typography variant="h3" color={'primary'} fontWeight={700}>EXPIRED</Typography>
            <Box sx={{ width: 600, height: 20, zIndex: '5', bgcolor: '#d52e24' }} />
        </div>
    );
}

export default VacationOverSticker;
