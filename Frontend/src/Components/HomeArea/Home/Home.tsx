import "./Home.css";
import Register from "../../AuthArea/Register/Register";

function Home(): JSX.Element {
    return (
        <div className="Home">
			<h2>Home Page</h2>
            <Register />
        </div>
    );
}

export default Home;
