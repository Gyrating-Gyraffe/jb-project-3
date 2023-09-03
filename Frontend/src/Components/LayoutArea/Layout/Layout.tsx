import CssBaseline from "@mui/material/CssBaseline";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { teal, lime, amber } from '@mui/material/colors';

import Routing from "../Routing/Routing";

function Layout(): JSX.Element {
    const theme = createTheme({
        palette: {
            primary: {
                main: `#3f51b5`,
            },
            secondary: {
                main: `#3f8cb5`,
            },
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
