import { Box, Typography } from "@mui/material";
import UserModel from "../../../Models/UserModel";
import Hero from "../../LayoutArea/Hero/Hero";
import GuestHome from "../GuestHome/GuestHome";
import UserHome from "../UserHome/UserHome";
import AdminHome from "../AdminHome/AdminHome";
import Copyright from "../../LayoutArea/Copyright/Copyright";

type HomeProps = {
    user: UserModel
}

function Home(props: HomeProps): JSX.Element {

    if (!props.user) {
        return (
            <>
                <Hero />
                <GuestHome />
                <Copyright  mt={15} />
            </>
        );
    }

    return (
        <>
            <Hero user={props.user} />
            {props.user.isAdmin ? <AdminHome /> : <UserHome />}
            <Copyright mt={15} />
        </>
    );
}

export default Home;