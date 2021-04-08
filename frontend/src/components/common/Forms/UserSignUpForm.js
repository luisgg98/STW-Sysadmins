import React, { useState, useContext } from "react";
import { UserContext } from "../../../UserContext";
import { signup } from "../../../services/AuthService";
import axios from "axios";

const UserSignUpForm = () => {
    // Datos del formulario

    axios.interceptors.request.use(
        (config) => {
            console.log(config);
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    const [details, setDetails] = useState({
        phone: 0,
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Mensaje de error
    const [error, setError] = useState("");

    // Datos del usuario hacer login
    const { user, setUser } = useContext(UserContext);

    function handleConfirmPassword(event) {
        if (event.target.value !== details.password) {
            console.log("error");
            setDetails({ ...details, confirmPassword: event.target.value });
        } else setDetails({ ...details, confirmPassword: event.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("handling submit");
        setUser({
            phone: details.phone,
            email: details.email,
            fname: details.fname,
            lname: details.lname,
            password: details.password,
        });
        const user = {
            phone: Number(details.phone),
            first_name: details.fname,
            last_name: details.lname,
            email: details.email,
            password: details.password,
        };
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
                console.log(res.data);
            });
    }
    function signUpHandler(e) {
        e.preventDefault();

        if (signup(details)) {
            console.log("Signed up");
            setUser({
                phone: details.phone,
                email: details.email,
                password: details.password,
            });
        } else {
            console.log("Details do not match!");
            setError("Details do not match!");
        }
    }

    return (
        //User signuphandler if you want to worki with local hardcoded testing
        // <form onSubmit={signUpHandler} class="col-5" >
        //Use handleSubmit if you want to work with the API
<<<<<<< HEAD
        <form onSubmit={handleSubmit} className="col-9"  >
=======
        <form onSubmit={handleSubmit} class="col-5">
>>>>>>> 9568b41c0a3009555362398b25d5038a9c30f227
            <h3 class="d-flex justify-content-center">Sign Up</h3>
            {error !== "" ? <div className="error">{error}</div> : ""}
            <div className="form-group">
                <label>Phone number</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Phone number"
                    onChange={(e) =>
                        setDetails({ ...details, phone: e.target.value })
                    }
                    value={details.phone}
                />
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) =>
                        setDetails({ ...details, email: e.target.value })
                    }
                    value={details.email}
                />
            </div>

            <div className="form-group">
                <label>First Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    onChange={(e) =>
                        setDetails({ ...details, fname: e.target.value })
                    }
                    value={details.fname}
                />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    onChange={(e) =>
                        setDetails({ ...details, lname: e.target.value })
                    }
                    value={details.lname}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) =>
                        setDetails({ ...details, password: e.target.value })
                    }
                    value={details.password}
                />
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    onChange={handleConfirmPassword}
                    value={details.confirmPassword}
                />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
                Sign Up
            </button>
            <p className="forgot-password text-right">
                Already registered <a href="/">sign in?</a>
            </p>
        </form>
    );
};

export default UserSignUpForm;
