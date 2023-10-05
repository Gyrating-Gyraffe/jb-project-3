import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoIcon from '@mui/icons-material/Info';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import appConfig from '../../../Utils/AppConfig';
import countryFlag from '../../../Utils/CountryFlag';
import VacationOverSticker from '../../LayoutArea/VacationOverSticker/VacationOverSticker';

type VacationCardProps = {
    vacation: VacationModel;
    followState: boolean;
    onFollow: Function
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [flagUrl, setFlagUrl] = useState<string>('');

    useEffect(() => { getFlag().then(res => setFlagUrl(res)).catch(err => console.log(err)) }, [])

    function formatPrice(price: number): string {
        return price.toLocaleString();
    }

    async function getFlag(): Promise<string> {
        return await countryFlag.getFlagUrl(props.vacation.destination.split(', ')[1] || props.vacation.destination);
    }

    return (
        <Paper elevation={5} sx={{
            width: 380, maxWidth: '80vw', m: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            backgroundColor: '#eaf8fd'
        }}>
            {/* <CardContentArea> */}
            <CardContent sx={{ overflow: 'hidden', position: 'relative' }}>
                <VacationOverSticker endDate={props.vacation.endDate} key={props.vacation.vacationId} />
                <CardMedia
                    component="img"
                    height="300"
                    image={props.vacation.imageUrl}
                    alt="vacation photo"
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingInline: '0px', mb: 5, mt: 5 }}>
                    <Typography gutterBottom variant="h5" fontWeight={500} component="div" sx={{ mt: 6, marginInline: '8px' }}>
                        {props.vacation.destination}
                    </Typography>
                    <img src={flagUrl} width={30} height={30} style={{ margin: 'auto', marginInline: '8px' }} />
                </Box>
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
                    <Typography gutterBottom variant="h6" component="div" sx={{ mt: 0, mb: 0, ml: 10, textAlign: 'left' }} color={'#3b3b3b'}>
                        Starting At: {formatPrice(props.vacation.price)}$
                    </Typography>
                </Box>
                <Box width={'102%'} color={'red'} sx={{
                    margin: 0, padding: 5, translate: '-4px', display: 'flex',
                    flexDirection: 'row', justifyContent: 'flex-end'
                }}>
                    <Button size="medium" color={'inherit'} variant='contained' onClick={() => props.onFollow(props.vacation)} sx={{ marginInline: 2, flex: 3 }}>
                        <Typography sx={{ textTransform: 'capitalize', fontWeight: '500' }}>
                            {props.followState ? 'Unfollow' : 'Follow'}
                        </Typography> &nbsp;
                        {props.followState ? <FavoriteIcon /> : <FavoriteBorderIcon />} &nbsp;
                        <Typography sx={{ fontWeight: '500' }}>
                            {props.vacation.followerCount}
                        </Typography>
                    </Button>
                    <Button size="medium" color={'primary'} variant='contained' component={NavLink}
                        to={appConfig.externalApi.wikipediaUrl + props.vacation.destination} target='_blank' sx={{ marginInline: 3 }}>
                        <InfoIcon sx={{ maxWidth: '30px' }} />
                    </Button>
                    <Button size="medium" color={'primary'} variant='contained' component={NavLink}
                        to={`/vacations/album/${props.vacation.vacationId}`} sx={{ marginInline: 3 }}>
                        <PhotoLibraryIcon />
                    </Button>
                    <Button size="medium" color={'primary'} variant='contained' component={NavLink}
                        to={appConfig.externalApi.googleMapsUrl + props.vacation.destination} target='_blank' sx={{ marginInline: 3 }}>
                        <PlaceIcon />
                    </Button>
                </Box>
            </CardActions>
        </Paper>
    );
}

export default VacationCard