import React, { useState, useContext } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { UserContext } from "../../../UserContext"
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Alert, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';


const LoginForm = () => {
    // Datos del usuario hacer login
    const { user, setUser } = useContext(UserContext);

    // Datos del formulario
    const [loading, setLoading] = useState(false);
    const [formValue, setForm] = useState({
        email: "",
        password: "",
    });

    // Mensaje de error
    const [apiError, setApiError] = useState(false);


    const { formState: { errors, touchedFields }, register, setError, handleSubmit } = useForm({ mode: 'onSubmit'});

    const onSubmit = async (data, e) => {
        console.log("handling submit");
        e.preventDefault();
        console.log(data);
        require('axios-debug-log');
        setLoading(true);
        try {
            const response = await axios.post(`https://stw-zitation.herokuapp.com/api/users/login`, formValue,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            if (response.status === 200) {
                setUser({
                    email: formValue.email,
                })
            } else {
                console.log("error 40x");
            }
            console.log(response.status);
        } catch (e) {
            console.log('catch error');
            setApiError(true)
            setForm({
                email: '',
                password: ''
            })
            setUser({
                email: ''
            })

        }
        setLoading(false);
    }

    const LoadingSpinner = () => {
        if (loading) {
            return (
                <Row className=" justify-content-center mx-auto pb-3" >
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner></Row>)
        }
        else return null
    }

    const AlertMessage = () => {
        if (apiError) {
            return (<Alert variant="danger">
                Credenciales incorrectas
            </Alert>)
        } else return null
    }


    return (
        <div>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formValue.email}
                        {...register("email", {
                            required: { value: true, message: "Correo necesario" },
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Formato del correo erroneo"
                            }
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, email: e.target.value })
                            if (errors.email) {
                                setError(errors.email.message)
                            }
                        }
                        }
                        isInvalid={errors.email && touchedFields.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        Invalid email
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={formValue.password}
                        {...register("password", {
                            required: {value: true, message: "Contraseña necesaria"},
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, password: e.target.value })
                            if (errors.password) {
                                setError(errors.password.message)
                            }
                        }
                        }
                        isInvalid={errors.password && touchedFields.password} />
                    <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Link to="/registro">
                        ¿No tienes una cuenta? Registrate ahora!
                    </Link>
                </Form.Group>
                <LoadingSpinner />
                <Row className="justify-content-center mx-auto ">
                    <Button variant="primary" type="submit">Log In</Button>
                </Row>
                <Row className="justify-content-center mx-auto pt-2">
                    <AlertMessage />
                </Row>
            </Form>
        </div>
    )


};

export default LoginForm;
