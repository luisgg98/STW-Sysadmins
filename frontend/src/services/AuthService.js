import axios from 'axios';
import react from 'react';

const userDB = {
    phone: "666777888",
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

function signup(details) {
    console.log(details);

    if (details.phone === userDB.phone &&
        details.email === userDB.email &&
        details.password === userDB.password) {
        return true;
    }
    else return false;
}

function logout() {
    console.log("Logout");
    // TODO: Añadir logica de logout
}

export { login, logout, signup };
