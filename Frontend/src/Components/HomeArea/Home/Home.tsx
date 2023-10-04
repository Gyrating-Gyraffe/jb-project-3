import { Box, Typography } from "@mui/material";
import UserModel from "../../../Models/UserModel";
import Hero from "../../LayoutArea/Hero/Hero";
import GuestHome from "../GuestHome/GuestHome";
import UserHome from "../UserHome/UserHome";
import AdminHome from "../AdminHome/AdminHome";

type HomeProps = {
    user: UserModel
}

function Home(props: HomeProps): JSX.Element {

    if (!props.user) {
        return (
            <>
                <Hero />
                <GuestHome />
            </>
        );
    }

    return (
        <>
            <Box>
                <Hero user={props.user} />
                {props.user.isAdmin ? <AdminHome /> : <UserHome />}
            </Box>
        </>
    );
}

export default Home;