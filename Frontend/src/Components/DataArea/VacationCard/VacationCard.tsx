import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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
                    // image={`https://source.unsplash.com/random?${props.vacation.destination.split(',')[0]}`}
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
            <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'secondary.100' }}>
                
                <Box width={'120%'}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ mt: 6 }} color={'#3b3b3b'}>
                        <CalendarMonthIcon sx={{ margin: '0 2% 0 0' }} />
                        {props.vacation.getVacationDateStrings()}
                    </Typography>
                </Box>
                <Button size="large" color={'primary'} variant='contained'>
                    Follow
                </Button>
            </CardActions>
        </Card>
    );
}

export default VacationCard