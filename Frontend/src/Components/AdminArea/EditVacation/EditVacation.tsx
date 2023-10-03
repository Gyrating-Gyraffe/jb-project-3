import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from '../../../Models/VacationModel';
import dataService from '../../../Services/DataService';
import notifyService from '../../../Services/NotifyService';
import Copyright from '../../LayoutArea/Copyright/Copyright';
import ImageUpload from '../ImageUpload/ImageUpload';
import { ResourceNotFoundError } from '../../../Models/ClientErrors';
import formValidator, { ValidationState } from '../../../Utils/FormValidator';

// This component handles Editing and Adding new vacations, depending on route:
function EditVacation(): JSX.Element {
    // Get ID from route params (Can be undefined, when adding a new vacation):
    const { id } = useParams();

    const [validationState, setValidationState] = useState<ValidationState>({
        destination: true,
        description: true,
        startDate: true,
        endDate: true,
        price: true
    });

    const navigate = useNavigate();

    const [vacation, setVacation] = useState<VacationModel>(new VacationModel({
        destination: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        price: 0,
        imageUrl: ''
    }));


    // On init:
    useEffect(() => {

        // If we have ID, get vacation:
        if (id) {
            dataService.getVacation(+id)
                .then(res => setVacation(new VacationModel(res)))
                .catch(() => { notifyService.error(new ResourceNotFoundError("Vacation not found")); navigate("/home"); });
        }
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate(vacation)) return;

        // POST vacation:
        if (id) {
            dataService.updateVacation(vacation)
                .then(() => {
                    notifyService.success(`Vacation to ${vacation.destination} updated successfully! Database ID: ${vacation.vacationId}`);
                    navigate('/home');
                })
                .catch(err => notifyService.error(err));
        }
        else {
            dataService.addVacation(vacation)
                .then(res => {
                    notifyService.success(`Vacation to ${res.destination} added successfully! Database ID: ${res.vacationId}`);
                    navigate('/home');
                })
                .catch(err => notifyService.error(err));
        }
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setVacation((prevVacation) => ({
            ...prevVacation,
            [name]: name === 'price' ? +value : value,
        }));

    };

    const validate = (user: VacationModel): boolean => {
        try {
            // If our ID is empty then we're adding a new vacation, so no dates past today:
            if (!id && isDateBeforeToday(vacation.startDate)) {
                notifyService.error("Start Date can't be earlier than today");
                return;
            }
            VacationModel.validate(user);
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

    const handleStartDateChange = (newDate: Dayjs) => {
        const updatedVacation = new VacationModel(vacation);

        updatedVacation.startDate = newDate.toDate();

        setVacation(updatedVacation);
    };

    const handleEndDateChange = (newDate: Dayjs) => {
        const updatedVacation = new VacationModel(vacation);

        updatedVacation.endDate = newDate.toDate();

        setVacation(updatedVacation);
    };

    const handleImageChange = (newImageUrl: string) => {
        const updatedVacation = new VacationModel(vacation);

        updatedVacation.imageUrl = newImageUrl;

        setVacation(updatedVacation);
    };

    function isDateBeforeToday(date: Date) {
        return new Date(date.toDateString()) < new Date(new Date().toDateString());
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <AppRegistrationOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {id ? "Edit Vacation" : "Add Vacation"}
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <TextField autoComplete="vacation-destination" name="destination" required fullWidth
                                id="destination" label="Destination" autoFocus value={vacation?.destination || ''} onChange={handleInput}
                                error={!validationState["destination"]}
                                helperText={!validationState["destination"] ? "Invalid Destination" : ""} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField multiline minRows={3} maxRows={6} required fullWidth id="description"
                                label="Description" name="description" autoComplete="vacation-description"
                                value={vacation?.description || ''} onChange={handleInput}
                                error={!validationState["description"]}
                                helperText={!validationState["description"] ? "Invalid Description" : ""} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DatePicker label="Start Date" value={dayjs(vacation?.startDate)} sx={{ width: '100%' }} onChange={handleStartDateChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DatePicker label="End Date" value={dayjs(vacation?.endDate)} sx={{ width: '100%' }} onChange={handleEndDateChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField inputProps={{ type: 'number' }} required fullWidth
                                id="price" label="Price" name="price" autoComplete="vacation-price"
                                onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                value={vacation?.price || 0} onChange={handleInput}
                                error={!validationState["price"]}
                                helperText={!validationState["price"] ? "Invalid Price" : ""} />
                        </Grid>

                        <Grid item xs={12}>
                            <ImageUpload imageUrl={vacation?.imageUrl} onImageChange={handleImageChange} />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 5, mb: 2 }}>
                        {id ? "Update" : "Add"}
                    </Button>

                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}

export default EditVacation;
