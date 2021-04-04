import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/common/Forms/LoginForm";
import { UserContext } from "../UserContext";
import { logout } from "../services/AuthService";

const LoginPage = () => {
    const { user, setUser } = useContext(UserContext);

    function logOutHandler() {
        logout();
        setUser({ email: "" });
    }

    return (
        <div>
            {user.email !== "" ? (
                <div>
                    <h1>Mi cuenta</h1>
                    <p>
                        <span>{user.email}</span>
                    </p>
                    <Link to="/login">
                        <button onClick={logOutHandler}>LogOut</button>
                    </Link>
                </div>
            ) : (
                <div>
                    <div class="d-flex justify-content-center display-4 pl-4 ml-5" >
                        <Link to='/'> Zitation </Link>
                    </div>
                    <div class="col-12 d-flex justify-content-center pt-4">
                        <LoginForm />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
