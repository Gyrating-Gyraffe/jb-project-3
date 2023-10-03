import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import dataService from '../../../Services/DataService';
import notifyService from '../../../Services/NotifyService';
import Copyright from '../../LayoutArea/Copyright/Copyright';
import Loading from '../../LayoutArea/Loading/Loading';
import VacationsChart from '../VacationsChart/VacationsChart';
import VacationsTable from '../VacationsTable/VacationsTable';
import CsvDownloader from '../CsvDownloader/CsvDownloader';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const defaultTheme = createTheme();
defaultTheme.palette.background.default = "#f5f5f5";

export default function AdminDashboard() {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    const [isLoadingVacations, setIsLoadingVacations] = useState<boolean>(true);

    const navigate = useNavigate();

    // On mount:
    useEffect(() => {

        // Get vacations from DB:
        dataService.getAllVacations()
            .then(data => {
                setVacations(data);
                setIsLoadingVacations(false);
            })
            .catch(err => {
                notifyService.error(err);
                navigate('/login');
            });
    }, []);

    const goHome = () => {
        navigate('/home');
    };

    if(isLoadingVacations) return <Loading />;

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={false}>
                    <Toolbar
                        sx={{
                            pr: '24px'
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={goHome}
                            sx={{
                                marginRight: '36px',
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Admin Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',  
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Vacations Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 330,
                                    }}
                                >
                                    <Typography color="primary" variant='h6'>Vacations Report</Typography>
                                    <VacationsChart vacations={vacations} height={280} />
                                </Paper>
                            </Grid>
                            {/* CSV Download Area */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 330,
                                    }}
                                >
                                    <CsvDownloader vacations={vacations} />
                                </Paper>
                            </Grid>
                            {/* Vacations Table */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <VacationsTable vacations={vacations} />
                                </Paper>
                            </Grid>
                        </Grid>
                        <br />
                        <Copyright />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}