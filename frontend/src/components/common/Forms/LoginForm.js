import React, { useState, useContext } from "react";
import { Button, Form, ResponsiveEmbed, Row } from "react-bootstrap";
import { UserContext } from "../../../UserContext"
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Alert, Spinner } from "react-bootstrap";
import { Link, Redirect, useHistory } from 'react-router-dom';
import { API } from '../../../services/AuthService'

const LoginForm = () => {
    // Datos del usuario hacer login
    const { user, setUser } = useContext(UserContext);

    const history = useHistory();

    // Datos del formulario
    const [loading, setLoading] = useState(false);
    const [formValue, setForm] = useState({
        email: "",
        password: "",
        check: false,
    });

    // Mensaje de error
    const [apiError, setApiError] = useState(false);


    const { formState: { errors, touchedFields }, register, setError, handleSubmit } = useForm({ mode: 'onSubmit' });

    function saveUserInfo(response) {
        localStorage.setItem("token", response.token);
        if (formValue.check)
            setUser({
                name: response.company.name,
                email: response.company.email,
                id: response.company.id,
            })
        else
            setUser({
                first_name: response.user.first_name,
                email: response.user.email,
                id: response.user.id,
                last_name: response.user.last_name,
                phone: response.user.last_name,
            })
        localStorage.setItem("user", user);
        localStorage.setItem("logged", true);
    }

    const onSubmit = (data, e) => {
        let loginUrl = API;
        if (formValue.check)
            loginUrl += 'companies/login'
        else
            loginUrl += 'users/login'

        console.log("handling submit");
        e.preventDefault();
        console.log(data);
        setLoading(true);
        axios.post(loginUrl,
            {
                email: formValue.email,
                password: formValue.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.status === 200) {
                    console.log("repsonse ", response.data)
                    saveUserInfo(response.data)
                }
                history.push('/home')
            }).catch((error) => {
                setApiError(true);
                console.log("erorr catch", error);
                setForm({
                    email: '',
                    password: ''
                })
                setUser({
                    email: ''
                })
            })
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
                            required: { value: true, message: "Contraseña necesaria" },
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
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Soy una empresa"
                        onChange={(e) => {
                            setForm({ ...formValue, check: !formValue.check })
                        }} />
                </Form.Group>
                <Form.Group>
                    <Link to="/registro">
                        ¿No tienes una cuenta? Registrate ahora!
                    </Link>
                </Form.Group>
                <LoadingSpinner />
                <Row className="justify-content-center mx-auto ">
                    <Button variant="primary" type="submit" >Log In</Button>
                </Row>
                <Row className="justify-content-center mx-auto pt-2">
                    <AlertMessage />
                </Row>
            </Form>
        </div>
    )


};

export default LoginForm;
