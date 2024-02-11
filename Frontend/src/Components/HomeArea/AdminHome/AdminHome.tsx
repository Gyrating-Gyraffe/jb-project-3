import { Box, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import { NavLink } from "react-router-dom";
import vacationsCardImage from "../../../Assets/Images/vacations.png";
import signOutCardImage from "../../../Assets/Images/signout.png";
import dashboardCardImage from "../../../Assets/Images/dashboard.png";

function AdminHome(): JSX.Element {
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
                                Being an admin is hard work. It's okay to take a break sometimes.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                {/* Vacations Card */}
                <Card sx={{ width: 345, mx: 10 }}>
                    <CardActionArea sx={{ height: '100%' }} component={NavLink} to={'/admin/vacations'}>
                        <CardMedia
                            component="img"
                            height="170"
                            image={vacationsCardImage}
                            alt="register"
                        />
                        <CardContent>
                            <VpnLockIcon sx={{ color: 'teal', zIndex: 3 }} />
                            <Typography gutterBottom variant="h4" component="div" fontWeight={600} color={'teal'}>
                                Vacations - Admin
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Add new vacations, edit existing vacations. You are a vacation god in here.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                {/* Dashboard Card */}
                <Card sx={{ width: 345, mx: 10 }}>
                    <CardActionArea sx={{ height: '100%' }} component={NavLink} to={'/admin/dashboard'}>
                        <CardMedia
                            component="img"
                            height="170"
                            image={dashboardCardImage}
                            alt="login"
                            sx={{ filter: '' }}
                        />
                        <CardContent>
                            <EqualizerIcon sx={{ color: 'secondary.main', zIndex: 3 }} />
                            <Typography gutterBottom variant="h4" component="div" fontWeight={600} color={'secondary.light'}>
                                Dashboard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                View reports; Download CSVs; Do admin stuff. Also, it's blue in here!
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </>
    );
}

export default AdminHome;
