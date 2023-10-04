import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import authService from "../../../Services/AuthService";
import Loading from "../Loading/Loading";
import NavBar from "../Menu/NavBar";
import Routing from "../Routing/Routing";

function Layout(): JSX.Element {
    
    const [isLoading, setIsLoading] = useState(true);

    // Relog user on first layout render:
    useEffect(() => {
        authService.relog()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    }, []);
//24cbd5
    const theme = createTheme({
        palette: {
            primary: {
                main: `#d52e24`,
                "100": `#f59e98`
            },
            secondary: {
                main: `#0288D1`,
                "100": `#94ebf5`
            },
            action: {
                active: '#24cbd5',
                selected: '#24cbd5',

            },
            mode: 'light'
        },
        spacing: 2,
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <NavBar isLoading={isLoading} />

                {/* If loading, show loading screen instead of main routing component */}
                { isLoading ? <Loading /> : <Routing /> }
            </ThemeProvider>
        </>
    );
}

export default Layout;
