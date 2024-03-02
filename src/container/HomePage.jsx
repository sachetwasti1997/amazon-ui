import { useState } from "react";
import { } from "react-router-dom";
import SignUpForm from "../component/SignUpForm";

const HomePage = () => {
    const [isLogged, setIsUserLogged] = useState(false);

    useState(() => {
        const bearerToken = localStorage.getItem("token");
        console.log(bearerToken);
        if (!bearerToken) {
            setIsUserLogged(false);
        }else {
            setIsUserLogged(true);
        }
    }, []);

    return (
        <div>
            {isLogged ? "": <SignUpForm/>}
        </div>
    );
}

export default HomePage;