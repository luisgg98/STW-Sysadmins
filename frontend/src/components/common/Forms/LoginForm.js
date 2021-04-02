import React, { useState, useContext } from "react";
import { UserContext } from "../../../UserContext";
import { login } from "../../../services/AuthService";

const LoginForm = () => {
    // Datos del formulario
    const [details, setDetails] = useState({
        email: "",
        password: "",
    });

    // Mensaje de error
    const [error, setError] = useState("");

    // Datos del usuario hacer login
    const { user, setUser } = useContext(UserContext);

    function loginHandler(e) {
        e.preventDefault();

        if (login(details)) {
            console.log("Logged in");
            setUser({
                email: details.email,
            });
        } else {
            console.log("Details do not match!");
            setError("Details do not match!");
        }
    }

    return (
        <form onSubmit={loginHandler}>
            <div className="form-inner">
                <h2>Login</h2>
                {error !== "" ? <div className="error">{error}</div> : ""}
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) =>
                            setDetails({ ...details, email: e.target.value })
                        }
                        value={details.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) =>
                            setDetails({ ...details, password: e.target.value })
                        }
                        value={details.password}
                    />
                </div>
                <input type="submit" value="Login" />
            </div>
        </form>
    );
};

export default LoginForm;
