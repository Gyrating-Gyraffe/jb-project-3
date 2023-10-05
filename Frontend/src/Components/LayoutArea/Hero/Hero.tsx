import { Box, Container, Typography } from "@mui/material";
import cardinalLogo from "../../../Assets/Images/red_cardinal_logo.png";
import UserModel from "../../../Models/UserModel";

type HeroProps = {
    user?: UserModel;
}

function Hero(props: HeroProps): JSX.Element {
    return (
        <Box sx={{ pt: 0, pb: 6, mt: 15 }}>
            <Container maxWidth="sm">
                <Box component={"img"} width={'400px'} maxWidth={'97vw'} height={'auto'}
                    src={cardinalLogo} />
                <Typography variant="h5" fontStyle={'italic'} align="center" color="text.secondary">
                    {props.user ?
                        <Box>
                            Welcome back,&nbsp;
                            <Typography variant="h5" fontWeight={500} color={'primary'} component={'span'}>
                                {props.user.firstName} {props.user.lastName}
                            </Typography>
                        </Box>
                        : "The early bird gets the best vacations."}
                </Typography>
            </Container>
        </Box>
    );
}

export default Hero;
