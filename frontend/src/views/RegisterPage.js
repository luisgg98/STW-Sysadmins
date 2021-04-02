import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import HomeSlogan from "../components/common/PlainText/HomeSlogan"
import UserSignUpForm from "../components/common/Forms/UserSignUpForm"
import { UserContext } from "../UserContext";
import { logout } from "../services/AuthService";

const RegisterPage = () => {

    const { user, setUser } = useContext(UserContext);

    function logOutHandler() {
        logout();
        setUser({ email: "" });
    }

    return (
        <div>
            <div class="d-flex justify-content-center display-4 pl-4 ml-5" >
                <Link to='/'> Zitation </Link>
            </div>

            { user.email !== "" ? (
                <div className="Perfil">
                    <h1>Mi cuenta registrada</h1>
                    <p>
                        <span>{user.email}</span>
                        <span>{user.phone}</span>
                    </p>
                    <Link to="/">
                        <button onClick={logOutHandler}>LogOut</button>
                    </Link>
                </div>
            ) : (
                <div>
                    <HomeSlogan />
                    <div class="py-2 my-2"></div>
                    <div class="col-12 d-flex justify-content-center pt-4">
                        <UserSignUpForm />
                    </div>
                </div>

            )}
        </div>
    )
}

export default RegisterPage;
