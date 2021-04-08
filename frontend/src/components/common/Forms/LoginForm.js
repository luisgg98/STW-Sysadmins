import React, { useState, useContext } from "react";
import * as yup from 'yup';
import { Button, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { UserContext } from "../../../UserContext"
import API from "../../../services/AuthService"
import axios from 'axios';

const LoginForm = () => {

    // Datos del usuario hacer login
    const { user, setUser } = useContext(UserContext);

    // Datos del formulario
    const [details, setDetails] = useState({
        email: "",
        password: "",
    });

    // Mensaje de error
    const [error, setError] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        console.log("handling submit");

        require('axios-debug-log')
        axios.post(`https://stw-zitation.herokuapp.com/api/users/login`, details,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                (response) => {
                    if (response.status === 200) {
                        setUser({
                            email: details.email,
                        })
                    }
                    else {
                        console.log("error 40x");
                    }
                    console.log(response.status);
                }
            ).catch(e => {
                console.log('catch error');
                setUser({
                    email: ''
                })
            })
    }

    return (
        <div>
            <Form noValidate onSubmit={handleSubmit} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={details.email}
                        onChange={(e) =>
                            setDetails({ ...details, email: e.target.value })
                        } 
                        onError='error'/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                            </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={details.password}
                        onChange={(e) =>
                            setDetails({ ...details, password: e.target.value })
                        }
                        onError='error' />
                </Form.Group>
                <Button variant="primary" type="submit">Log In</Button>
            </Form>
        </div>
    )


};

export default LoginForm;
