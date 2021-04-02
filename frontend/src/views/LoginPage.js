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
                <div className="Perfil">
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
                    <h1>Zitation</h1>
                    <LoginForm />
                    <span>
                      ¿Todavia no tiene una cuenta? <Link to='/registro'> Registrarse </Link> 
                    </span>
                    
                </div>
            )}
        </div>
    );
};

export default LoginPage;
