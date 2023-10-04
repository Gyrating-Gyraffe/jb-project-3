import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import authService from '../../../Services/AuthService';
import Copyright from '../../LayoutArea/Copyright/Copyright';
import { FormEvent, useState } from 'react';
import formValidator, { ValidationState } from '../../../Utils/FormValidator';
import notifyService from '../../../Services/NotifyService';

type RegisterProps = {
    user: UserModel;
}

function Register(props: RegisterProps): JSX.Element {

    const [validationState, setValidationState] = useState<ValidationState>({
        firstName: true, lastName: true,
        email: true, password: true
    });

    const navigate = useNavigate();

    // If already logged in, navigate to Home page:
    if (props.user) return <Navigate to={"/home"} />;

    // Handle form submission:
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = new UserModel({
            firstName: data.get('firstName').toString(),
            lastName: data.get('lastName').toString(),
            email: data.get('email').toString(),
            password: data.get('password').toString(),
        });

        if (!validate(user)) return;

        authService.register(user)
            .then(res => res ? navigate('/home') : navigate('/register'))
            .catch();
    };

    // Validate all form input:
    const validate = (user: UserModel): boolean => {
        try {
            UserModel.validate(user);
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
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <AppRegistrationOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="given-name" name="firstName" required fullWidth
                                id="firstName" label="First Name" autoFocus error={!validationState["firstName"]}
                                helperText={!validationState["firstName"] ? "Invalid First Name" : ""} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name"
                                error={!validationState["lastName"]}
                                helperText={!validationState["lastName"] ? "Invalid Last Name" : ""} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email"
                                error={!validationState["email"]}
                                helperText={!validationState["email"] ? "Invalid Email" : ""} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth name="password" label="Password" type="password" id="password"
                                autoComplete="new-password" error={!validationState["password"]}
                                helperText={!validationState["password"] ? "Invalid Password" : ""} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive vacation updates via email." />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={NavLink} to="/login">
                                {"Already have an account? Sign in."}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}

export default Register;