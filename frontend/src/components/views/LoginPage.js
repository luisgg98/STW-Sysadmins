import { useState } from "react";
import LoginForm from "../common/Forms/LoginForm"
import {
    Link
} from "react-router-dom";

const LoginPage = () => {

    const userDB = {
        email: "user@user.com",
        password: "user123"
    }

    const [user, setUser] = useState({ name: "", email: "" });
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details);

        if (details.email === userDB.email && details.password === userDB.password) {
            console.log("Logged in")
            setUser({
                name: details.name,
                email: details.email
            })
        } else {
            console.log("Details do not match!")
            setError("Details do not match!")
        }
    }

    const Logout = () => {
        console.log("Logout")
        setUser({ name: "", email: "" })
    }

    return (
        <div className="App">
            {(user.email !== "") ? (
                <div className="welcome">
                    <h1>Welcome, <span>{user.name}</span></h1>
                    <Link to="/">
                        <button onClick={Logout} >LogOut</button>
                    </Link>
                </div>
            ) : (
                <LoginForm Login={Login} error={error} />)}
        </div>
    )
}

export default LoginPage;