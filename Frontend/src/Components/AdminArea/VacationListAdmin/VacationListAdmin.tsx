import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import VacationCardAdmin from "../VacationCardAdmin/VacationCardAdmin";
import { NavLink } from "react-router-dom";
import Copyright from "../../LayoutArea/Copyright/Copyright";
import Hero from "../../LayoutArea/Hero/Hero";

function VacationListAdmin(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        dataService.getAllVacations()
            .then(data => setVacations(data))
            .catch(err => {
                notifyService.error(err);
                navigate('/login');
            });
    }, []);

    const handleDelete = (vacation: VacationModel) => {
        if (!window.confirm(`ARE YOU SURE? \n Vacation to ${vacation.destination} will be deleted.
        \n Vacation has ${vacation.followerCount > 0 ? vacation.followerCount : "no"} followers.`)) return;

        dataService.deleteVacation(vacation.vacationId)
            .then(() =>
                setVacations(vacations.filter(v => v.vacationId !== vacation.vacationId))
            )
            .catch(err => notifyService.error(err));
    };

    return (
        <>
            {/* Horizontal separator */}
            <Box sx={{ height: 5, bgcolor: '#0288D1' }}></Box>
            <Box sx={{ height: 5, bgcolor: '#24cbd5' }}></Box>
            
            {/* Hero Unit */}
            <Hero />

            <Typography variant="h3">Admin Access</Typography>
  
            <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, mt: 8 }}>
                <Container maxWidth="sm">
                    <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" component={NavLink} to={"/admin/vacations/new"} >Add Vacation</Button>
                        <Button variant="outlined" component={NavLink} to={"/admin/dashboard"}>View Dashboard</Button>
                    </Stack>
                </Container>
            </Box>
            {/* Card Container */}
            <Container sx={{ py: 8 }} maxWidth="xl">
                <Grid container spacing={4} justifyContent={'center'} sx={{ px: 4 }}>
                    {(vacations && vacations.map((vacation, index) => (
                        <VacationCardAdmin vacation={new VacationModel(vacation)} key={index} onDelete={handleDelete} />
                    )))}
                </Grid>
            </Container>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Like the website?
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    Check out more at: <a href="https://github.com/Gyrating-Gyraffe" target="_blank">
                        https://github.com/Gyrating-Gyraffe</a>
                </Typography>
                <Copyright />
            </Box>
        </>
    );
}

export default VacationListAdmin;
