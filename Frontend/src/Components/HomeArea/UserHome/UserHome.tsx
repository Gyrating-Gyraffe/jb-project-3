import { Box, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { NavLink } from "react-router-dom";
import vacationsCardImage from "../../../Assets/Images/vacations.png";
import signOutCardImage from "../../../Assets/Images/signout.png";

function UserHome(): JSX.Element {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
                {/* Sign out Card */}
                <Card sx={{ width: 345, mx: 10 }}>
                    <CardActionArea sx={{ height: '100%' }} component={NavLink} to={'/logout'}>
                        <CardMedia
                            component="img"
                            height="170"
                            image={signOutCardImage}
                            alt="register"
                        />
                        <CardContent>
                            <MeetingRoomTwoToneIcon sx={{ color: 'primary.main', zIndex: 3 }} />
                            <Typography gutterBottom variant="h4" component="div" fontWeight={600} color={'primary'}>
                                Sign Out
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You've found your dream vacation and are ready to embark on an epic adventure!
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                {/* Vacations Card */}
                <Card sx={{ width: 345, mx: 10 }}>
                    <CardActionArea sx={{ height: '100%' }} component={NavLink} to={'/vacations'}>
                        <CardMedia
                            component="img"
                            height="170"
                            image={vacationsCardImage}
                            alt="login"
                            sx={{ filter: '' }}
                        />
                        <CardContent>
                            <TravelExploreIcon sx={{ color: 'secondary.main', zIndex: 3 }} />
                            <Typography gutterBottom variant="h4" component="div" fontWeight={600} color={'secondary.light'}>
                                Vacations
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                View all vacations. <br />Filter vacations to see what's relevant to you. <br /> Find great deals.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </>
    );
}

export default UserHome;
