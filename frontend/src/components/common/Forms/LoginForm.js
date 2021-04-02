import React, {  useState, useContext } from "react";
import { UserContext } from "../../../UserContext";
import { login } from "../../../services/AuthService";
import { Link } from "react-router-dom";
import axios from 'axios';

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


    function handleSubmit(e) {
        e.preventDefault();
        console.log("handling submit");
        setUser({
            email: details.email,
            password: details.password
        })
        const user = {
            email: details.email,
            password: details.password
        }
        require('axios-debug-log')
        axios.post(`https://stw-zitation.herokuapp.com/api/users/login`,  user ,
            { headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

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
        //use this line if you want to test with hardcoded data
        // <form onSubmit={loginHandler} class="col-5" >
        //Use this line if you want to call the api
        <form onSubmit={handleSubmit} class="col-5" >
            <div className="form-inner">
                <h3 class="d-flex justify-content-center">Login</h3>
                {error !== "" ? <div className="error">{error}</div> : ""}
                <div className="form-group">
                    <label htmlFor="email" >Email: </label>
                    <input
                        className="form-control"
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
                    <label htmlFor="password" >Password: </label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) =>
                            setDetails({ ...details, password: e.target.value })
                        }
                        value={details.password}
                    />
                </div>
                <input type="submit" className="btn btn-primary btn-block" value="Login" />
                <span>
                        ¿Todavia no tiene una cuenta? <Link to='/registro'> Registrarse </Link>
                </span>
            </div>
        </form>
    );
};

export default LoginForm;
