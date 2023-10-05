import { Box, Button, CardMedia, Typography } from "@mui/material";
import heinzThe404Bird from "../../../Assets/Images/heinz_the_404_bird.png";
import { useNavigate } from "react-router-dom";

function PageNotFound(): JSX.Element {

    const navigate = useNavigate();

    const goHome = () => {
        return navigate("/home");
    }

    return (
        <>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} m={"auto"} p={'10vw'} flexWrap={'wrap'} >
                <Box width={'400px'} maxWidth={'80vw'} flex={1}>
                    <Typography variant="h1" fontSize={'7em'} fontWeight={700} color={"primary"}>
                        404
                    </Typography>
                    <Typography variant="h2" fontWeight={700} color={"text.secondary"}>
                        Oops!
                    </Typography>
                    <Typography variant="h6" fontWeight={400} color={"text.secondary"}>
                        You're not supposed to be here.&nbsp;
                        <Typography variant="h6" fontWeight={500} component={'span'} color={"primary"}>Heinz</Typography> is just as confused as you are.
                    </Typography>

                    <Button color={'primary'} variant={"contained"} onClick={goHome} sx={{ mt: 15 }} >
                        Go Home
                    </Button>

                </Box>

                <CardMedia component={'img'}
                    image={heinzThe404Bird}
                    alt="404 bird"
                    sx={{ objectFit: 'contain', width: "400px", maxWidth: '80vw', height: 'auto', flex: 1 }}
                >

                </CardMedia>
            </Box>
        </>
    );
}

export default PageNotFound;
