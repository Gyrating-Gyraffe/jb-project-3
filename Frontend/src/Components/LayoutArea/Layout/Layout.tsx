import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Menu from "../Menu/Menu";

import Routing from "../Routing/Routing";

function Layout(): JSX.Element {
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
