import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import signInCardImage from "../../../Assets/Images/signin.png";
import signUpCardImage from "../../../Assets/Images/signup.png";

function GuestHome(): JSX.Element {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
                {/* Register Card */}
                <Card sx={{ width: 345, mx: 10 }}>
                    <CardActionArea sx={{ height: '100%' }} component={NavLink} to={'/register'}>
                        <CardMedia
                            component="img"
                            height="170"
                            image={signUpCardImage}
                            alt="register"
                        />
                        <CardContent>
                            <AppRegistrationTwoToneIcon sx={{ color: '#A5231C' }} />
                            <Typography gutterBottom variant="h4" component="div" fontWeight={600} color={'primary'}>
                                Sign Up
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                New to the site? No problem. Registration is easy, and as soon as you're done you get
                                to enjoy all the site has to offer free of charge!
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                {/* Login Card */}
                <Card sx={{ width: 345, mx: 10 }}>
                    <CardActionArea sx={{ height: '100%' }} component={NavLink} to={'/login'}>
                        <CardMedia
                            component="img"
                            height="170"
                            image={signInCardImage}
                            alt="login"
                        />
                        <CardContent>
                            <LoginTwoToneIcon sx={{ color: '#A5231C', zIndex: 3 }} />
                            <Typography gutterBottom variant="h4" component="div" fontWeight={600} color={'primary'}>
                                Sign In
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Don't be a stranger! If you have an account, sign in over here.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </>
    );
}

export default GuestHome;
