import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Menu from "../Menu/NavBar";

import Routing from "../Routing/Routing";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import authService from "../../../Services/AuthService";
import { AuthActionType } from "../../../Redux/AuthState";

function Layout(): JSX.Element {
    const dispatch = useDispatch();

    useEffect(() => {
        authService.relog()
            .then(user => dispatch({ type: AuthActionType.SetState, payload: user }))
            .catch();

    }, [])

    const theme = createTheme({
        palette: {
            primary: {
                main: `#d52e24`,
            },
            secondary: {
                main: `#24cbd5`,
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
