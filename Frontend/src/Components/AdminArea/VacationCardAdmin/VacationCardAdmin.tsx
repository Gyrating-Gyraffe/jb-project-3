import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Box, Button, CardActions, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import appConfig from "../../../Utils/AppConfig";
import countryFlag from "../../../Utils/CountryFlag";

type VacationCardAdminProps = {
    vacation: VacationModel,
    onDelete: Function
}


function VacationCardAdmin(props: VacationCardAdminProps): JSX.Element {

    // Country flag URL:
    const [flagUrl, setFlagUrl] = useState<string>('');

    // Get country flag's URL:
    useEffect(() => { getFlag().then(res => setFlagUrl(res)).catch(err => console.log(err)) }, [])

    async function getFlag(): Promise<string> {
        return await countryFlag.getFlagUrl(props.vacation.destination.split(', ')[1] || props.vacation.destination);
    }

    // Add commas to price:
    function formatPrice(price: number): string {
        return price.toLocaleString();
    }

    // Create image object from imageUrl for dimensions of image in DB:
    const dbImage = new Image();
    dbImage.src = props.vacation.imageUrl;

    return (
        <Paper elevation={5} sx={{
            width: 380, m: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            backgroundColor: '#eaf8fd'
        }}>
            {/* Admin Controls */}
            <Box width={'102%'} color={'red'} sx={{
                margin: 0, padding: 5, translate: '-4px', display: 'flex',
                flexDirection: 'row', justifyContent: 'space-between'
            }}>
                <Button size="medium" color={'primary'} variant='contained' component={NavLink}
                    to={`/admin/vacations/edit/${props.vacation.vacationId}`} sx={{ marginInline: 3 }}>
                    <EditTwoToneIcon sx={{ maxWidth: '30px' }} />
                    &nbsp;Edit
                </Button>
                <Button size="medium" color={'primary'} variant='outlined' onClick={() => props.onDelete(props.vacation)} sx={{ marginInline: 3 }}>
                    Delete&nbsp;
                    <DeleteTwoToneIcon />
                </Button>
            </Box>
            {/* <CardContentArea> */}
            <CardContent sx={{ flex: 3 }}>
                <Box position='absolute' bgcolor='primary.main' p={3} color='white'>
                    DB Image Dimensions: <br /> {dbImage.width}x{dbImage.height}
                </Box>
                <CardMedia
                    component="img"
                    height="300"
                    image={props.vacation.imageUrl}
                    alt="vacation photo"
                    sx={{ border: 3, borderColor: 'primary.main' }}
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
                    <Typography gutterBottom variant="h5" component="div" sx={{ mt: 10, ml: 0, textAlign: 'center' }} color={'#3b3b3b'}>
                        <CalendarMonthIcon sx={{ margin: '0 2% 0 0' }} />
                        {VacationModel.getVacationDateStrings(props.vacation.startDate, props.vacation.endDate)}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ mt: 0, mb: 10, ml: 0, textAlign: 'center' }} color={'#3b3b3b'}>
                        Starting At: {formatPrice(props.vacation.price)}$
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ mt: 0, mb: 10, ml: 0, textAlign: 'center', backgroundColor: 'primary.main' }} color={'white'}>
                        Followers: {props.vacation.followerCount}
                    </Typography>
                </Box>
            </CardActions>
        </Paper>
    );
}

export default VacationCardAdmin;
