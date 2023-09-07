import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import VacationModel from '../../../Models/VacationModel';

type VacationCardProps = {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <Card sx={{ maxWidth: 455, m: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* <CardActionArea> */}
            <CardContent>
                <CardMedia
                    component="img"
                    height="300"
                    image={props.vacation.imageUrl}
                    alt="green iguana"
                />
                <Typography gutterBottom variant="h5" component="div" sx={{ mt: 6 }}>
                    {props.vacation.destination}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                    {props.vacation.description}
                </Typography>
            </CardContent>
            {/* </CardActionArea> */}
            <CardActions>
                <Button size="small" color="primary">
                    Follow
                </Button>
            </CardActions>
        </Card>
    );
}

export default VacationCard