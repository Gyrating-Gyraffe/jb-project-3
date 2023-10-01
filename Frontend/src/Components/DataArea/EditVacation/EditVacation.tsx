import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import Copyright from '../../LayoutArea/Copyright/Copyright';

import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from '../../../Models/VacationModel';
import dataService from '../../../Services/DataService';
import notifyService from '../../../Services/NotifyService';
import ImageUpload from '../ImageUpload/ImageUpload';

// This component handles Editing and Adding new vacations, depending on route:
function EditVacation(): JSX.Element {
    // Get ID from route params (Can be undefined, when adding a new vacation):
    const { id } = useParams();

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
                .then(res => setVacation(res))
                .catch(err => notifyService.error(err));
        }
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // POST vacation:
        dataService.addVacation(vacation)
            .then(res => { 
                notifyService.success(`Vacation to ${res.destination} added successfully!`); 
                navigate('/home');
            })
            .catch(err => notifyService.error(err));
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        const updatedVacation = new VacationModel(vacation);

        switch (name) {
            case "destination":
                updatedVacation.destination = value;
                break;
            case "description":
                updatedVacation.description = value;
                break;
            case "price":
                updatedVacation.price = +value;
                break;
        }

        setVacation(updatedVacation);
    };

    const handleStartDateChange = (newDate: Dayjs) => {
        const updatedVacation = new VacationModel(vacation);

        updatedVacation.startDate = newDate.toDate();

        // Preserve the endDate if it exists
        if (!dayjs(updatedVacation.endDate).isValid()) {
            updatedVacation.endDate = vacation.endDate;
        }

        setVacation(updatedVacation);
    };

    const handleEndDateChange = (newDate: Dayjs) => {
        const updatedVacation = new VacationModel(vacation);

        updatedVacation.endDate = newDate.toDate();

        // Preserve the endDate if it exists
        if (!dayjs(updatedVacation.startDate).isValid()) {
            updatedVacation.startDate = vacation.startDate;
        }

        setVacation(updatedVacation);
    };

    const handleImageChange = (newImageUrl: string) => {
        const updatedVacation = new VacationModel(vacation);

        updatedVacation.imageUrl = newImageUrl;

        setVacation(updatedVacation);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <AppRegistrationOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {id ? "Edit Vacation" : "Add Vacation"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <TextField autoComplete="vacation-destination" name="destination" required fullWidth
                                id="destination" label="Destination" autoFocus value={vacation?.destination || ''} onChange={handleInput} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField multiline minRows={3} maxRows={6} required fullWidth id="description"
                                label="Description" name="description" autoComplete="vacation-description"
                                value={vacation?.description || ''} onChange={handleInput} />
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
                                value={vacation?.price || 0} onChange={handleInput} />
                        </Grid>

                        <Grid item xs={12}>
                            <ImageUpload imageUrl={vacation?.imageUrl} onImageChange={handleImageChange}/>
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
