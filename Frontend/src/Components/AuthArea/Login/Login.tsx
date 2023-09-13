import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import CredentialsModel from '../../../Models/CredentialsModel';
import UserModel from '../../../Models/UserModel';
import { AuthActionType } from '../../../Redux/AuthState';
import authService from '../../../Services/AuthService';
import Copyright from '../../LayoutArea/Copyright/Copyright';


function Login(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const credentials = new CredentialsModel({
            email: data.get('email').toString(),
            password: data.get('password').toString(),
        });
        authService.login(credentials)
            .then((res: UserModel | boolean) => {
                res ? navigate('/home') : navigate('/login');
                dispatch({ type: AuthActionType.SetState, payload: res });
            })
            .catch();
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?travel)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"
                            autoComplete="email" autoFocus />
                        <TextField margin="normal" required fullWidth name="password" label="Password"
                            type="password" id="password" autoComplete="current-password" />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link component={NavLink} to="/password-reset">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={NavLink} to="/register">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Login;