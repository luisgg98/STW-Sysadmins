import { useContext } from "react";
import userContext from "../App";

const userDB = {
    email: "user@user.com",
    password: "user123",
};

function login(details) {
    console.log(details);

    if (
        details.email === userDB.email &&
        details.password === userDB.password
    ) {
        return true;
    } else {
        return false;
    }
}

function logout() {
    console.log("Logout");
    // TODO: Añadir logica de logout
}

export { login, logout };
