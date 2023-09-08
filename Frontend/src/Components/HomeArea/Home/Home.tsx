import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import VacationModel from '../../../Models/VacationModel';
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import VacationCard from '../../DataArea/VacationCard/VacationCard';
import Copyright from "../../LayoutArea/Copyright/Copyright";

function Home(): JSX.Element {
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

    return (
        <>
            {/* Hero Unit */}
            <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                        Vacations
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Top destinations for bottom prices.
                    </Typography>
                    <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained">Main call to action</Button>
                        <Button variant="outlined">Secondary action</Button>
                    </Stack>
                </Container>
            </Box>
            {/* Card Container */}
            <Container sx={{ py: 8 }} maxWidth="xl">
                <Grid container spacing={4} justifyContent={'center'}>
                    {vacations && vacations.map((vacation, index) => (
                        <VacationCard vacation={vacation} key={index} />
                    ))}
                </Grid>
            </Container>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </>
    );
}

export default Home;