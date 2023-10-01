import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthState } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import Loading from "../Loading/Loading";
import NavBar from "../Menu/NavBar";
import Routing from "../Routing/Routing";

function Layout(): JSX.Element {

    const user = useSelector((state: AuthState) => state.user);
    const [isLoading, setIsLoading] = useState(true);

    // Relog user on first layout render:
    useEffect(() => {
        authService.relog()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
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

                <NavBar isLoading={isLoading} />

                {/* If loading, show loading screen instead of main routing component */}
                { isLoading ? <Loading /> : <Routing /> }
            </ThemeProvider>
        </div>
    );
}

export default Layout;
