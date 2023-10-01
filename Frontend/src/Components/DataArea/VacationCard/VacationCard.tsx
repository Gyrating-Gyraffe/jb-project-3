import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlaceIcon from '@mui/icons-material/Place';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import { AuthState } from '../../../Redux/AuthState';
import dataService from '../../../Services/DataService';
import notifyService from '../../../Services/NotifyService';
import appConfig from '../../../Utils/AppConfig';

type VacationCardProps = {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [followState, setFollowState] = useState<boolean>(false);
    const [userChangedFollow, setUserChangedFollow] = useState<boolean>(false);

    const user = useSelector((state: AuthState) => state.user);

    // If user changed follow status, we increment the props.vacation.followerCount value with this:
    const followStatusIncrement = userChangedFollow ? (followState ? 1 : -1) : 0;

    // On init and User change (Redux Auth State):
    useEffect(() => {

        // If user is not logged in, return:
        if (!user) return;

        // Get follow status of user for this vacation:
        dataService.getVacationFollowStatus(props.vacation.vacationId)
            .then(res => { setFollowState(res); setUserChangedFollow(false); })
            .catch(err => notifyService.error(err.message));

    }, [user]);

    // Follow/Unfollow this vacation when button is pressed:
    function handleFollow() {
        dataService.followVacation(props.vacation.vacationId)
            .then(res => { setFollowState(res); setUserChangedFollow(!userChangedFollow); })
            .catch(err => notifyService.error(err.message));
    }

    return (
        <Card sx={{
            maxWidth: 455, m: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            backgroundColor: '#fafafa', border: 0, borderColor: 'primary.main'
        }}>
            {/* <CardContentArea> */}
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
            <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'secondary.100', padding: 0 }}>
                <Box width={'100%'}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ mt: 10, ml: 10, textAlign: 'left' }} color={'#3b3b3b'}>
                        <CalendarMonthIcon sx={{ margin: '0 2% 0 0' }} />
                        {VacationModel.getVacationDateStrings(props.vacation.startDate, props.vacation.endDate)}  
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ mt: 0, mb:0, ml: 10, textAlign: 'left' }} color={'#3b3b3b'}>
                        Price: {props.vacation.price}₪
                    </Typography>
                </Box>
                <Box width={'102%'} color={'red'} sx={{
                    margin: 0, padding: 5, translate: '-4px', display: 'flex',
                    flexDirection: 'row', justifyContent: 'flex-end'
                }}>
                    <Button size="medium" color={'inherit'} variant='contained' onClick={handleFollow} sx={{ margin: 2, flex: 3 }}>
                        {followState ? 'Unfollow' : 'Follow'} &nbsp;
                        {followState ? <FavoriteIcon /> : <FavoriteBorderIcon />} &nbsp; {props.vacation.followerCount + followStatusIncrement}
                    </Button>
                    <Button size="medium" color={'primary'} variant='contained' component={NavLink}
                        to={appConfig.externalApi.wikipediaUrl + props.vacation.destination} target='_blank' sx={{ margin: 4 }}>
                        <InfoIcon />
                    </Button>
                    <Button size="medium" color={'primary'} variant='contained' component={NavLink}
                        to={appConfig.externalApi.googleMapsUrl + props.vacation.destination} target='_blank' sx={{ margin: 4 }}>
                        <PhotoLibraryIcon />
                    </Button>
                    <Button size="medium" color={'primary'} variant='contained' component={NavLink}
                        to={appConfig.externalApi.googleMapsUrl + props.vacation.destination} target='_blank' sx={{ margin: 4 }}>
                        <PlaceIcon />
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}

export default VacationCard