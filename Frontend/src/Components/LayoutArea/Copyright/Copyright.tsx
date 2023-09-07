import { Typography, Link } from "@mui/material";

function Copyright(props: any): JSX.Element {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Gyrating-Gyraffe" target="_blank">
                Dave Manchenko
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;