import { Box, Container, Typography } from "@mui/material";
import cardinalLogo from "../../../Assets/Images/red_cardinal_logo.png";

function Hero(): JSX.Element {
    return (
        <Box sx={{ bgcolor: 'background.paper', pt: 0, pb: 6 }}>
            <Container maxWidth="sm">
            <Box component={"img"} width={400} height={220}
                        src={cardinalLogo} />
                    {/* <Typography component="h1" variant="h2" align="center" color="primary" fontWeight={600} mt={0}>
                        Red Cardinal
                    </Typography> */}
                <Typography variant="h5" fontStyle={'italic'} align="center" color="text.secondary" paragraph>
                    The early bird gets the best vacations.
                </Typography>
            </Container>
        </Box>
    );
}

export default Hero;
