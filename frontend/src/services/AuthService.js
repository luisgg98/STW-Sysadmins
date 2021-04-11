import axios from 'axios';


const userDB = {
    phone: "666777888",
    email: "user@user.com",
    password: "user123",
};


function submit_signup(user) {

    require("axios-debug-log");
    axios
        .post(
            `https://stw-zitation.herokuapp.com/api/users/register`,
            user,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => {
            console.log(res);
            console.log('data', res.data);
        });
}


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
    } else return false;
}

function logout() {
    console.log("Logout");
    // TODO: Añadir logica de logout
}

export {login, logout, signup};
export default axios.create({
    baseURL: 'https://stw-zitation.herokuapp.com/'
});
