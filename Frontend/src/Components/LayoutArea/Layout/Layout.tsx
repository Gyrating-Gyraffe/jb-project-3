import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Menu from "../Menu/NavBar";

import { useEffect } from "react";
import authService from "../../../Services/AuthService";
import Routing from "../Routing/Routing";

function Layout(): JSX.Element {

    // Relog user on first layout render:
    useEffect(() => {
        authService.relog();
    }, []);

    const theme = createTheme({
        palette: {
            primary: {
                main: `#d52e24`,
                "100": `#f59e98`
            },
            secondary: {
                main: `#24cbd5`,
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
        <div className="Layout">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Menu />

                {/* <Header /> */}

                <Routing />
            </ThemeProvider>

        </div>
    );
}

export default Layout;
