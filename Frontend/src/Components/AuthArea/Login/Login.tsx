import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, CssBaseline, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import CredentialsModel from '../../../Models/CredentialsModel';
import UserModel from '../../../Models/UserModel';
import { GlobalActionType } from '../../../Redux/GlobalState';
import authService from '../../../Services/AuthService';
import notifyService from '../../../Services/NotifyService';
import formValidator, { ValidationState } from '../../../Utils/FormValidator';
import Copyright from '../../LayoutArea/Copyright/Copyright';

function Login(): JSX.Element {

    const [validationState, setValidationState] = useState<ValidationState>({ email: true, password: true });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const credentials = new CredentialsModel({
            email: data.get('email').toString(),
            password: data.get('password').toString()
        });

        if(!validate(credentials)) return;

        authService.login(credentials)
            .then((res: UserModel | boolean) => {
                res ? navigate('/home') : navigate('/login');
                dispatch({ type: GlobalActionType.SetUser, payload: res });
            })
            .catch();
    };

    const validate = (credentials: CredentialsModel): boolean => {
        try {
            CredentialsModel.validate(credentials);
        }
        catch (err: any) {
            
            // Pass error to FormValidator to receive a new ValidationState:
            const newValidationState = formValidator.handleError(err, validationState);
            setValidationState(newValidationState);

            // Then notify the user of the issue:
            notifyService.error(err.message);
            
            return false;
        }

        return true;
    }

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
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square justifyContent={'space-between'}>
                <Box
                    sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                        <TextField margin="normal" required fullWidth label="Email Address" name="email"
                            autoComplete="email" autoFocus error={!validationState["email"]} 
                            helperText={!validationState["email"] ? "Invalid Email" : ""} />

                        <TextField margin="normal" required fullWidth name="password" label="Password"
                            type="password" id="password" autoComplete="current-password" error={!validationState["password"]}
                            helperText={!validationState["password"] ? "Invalid Password" : ""} />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 8, mb: 2 }}>
                            Sign In
                        </Button>

                        <Grid container>
                            <Grid item width={'100%'}>
                                <Link component={NavLink} to="/register" m={'auto'}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
                <Copyright />
            </Grid>
        </Grid>
    );
}

export default Login;