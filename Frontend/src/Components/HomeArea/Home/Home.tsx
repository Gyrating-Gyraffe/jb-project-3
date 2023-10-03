import UserModel from "../../../Models/UserModel";
import VacationListAdmin from "../../AdminArea/VacationListAdmin/VacationListAdmin";
import VacationList from "../../DataArea/VacationList/VacationList";

type HomeProps = {
    user: UserModel
}

function Home(props: HomeProps): JSX.Element {

    const isAdmin = props.user.isAdmin;

    if (isAdmin) {
        return (
            <>
                <VacationListAdmin />
            </>
        );
    }

    return (
        <VacationList />
    );
}

export default Home;