import React, {useContext} from 'react';
import {UserContext} from "../UserContext";
import {logout} from "../services/AuthService";
import {Button, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import {PageDescription} from "../components/common/Headers/Header";
import LoginForm from "../components/common/Forms/LoginForm";

function AccountPage() {
    const {user, setUser} = useContext(UserContext);

    function logOutHandler() {
        logout();
        setUser({email: ""});
    }

    return (
        <div>
            {user.email !== "" ? (
                <div>
                    <h1>Mi cuenta</h1>
                    <ul>
                        <li>Nombre: {user.name}</li>
                        <li>Email: {user.email}</li>
                    </ul>
                    <Link to="/home">
                        <Button type="button" onClick={logOutHandler}>Cerrar sesión</Button>
                    </Link>
                </div>


            ) : (
                <Redirect to="/login"/>
            )}


        </div>
    );
}

export default AccountPage;
