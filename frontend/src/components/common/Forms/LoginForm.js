import React, { useState, useContext } from "react";
import { Button, Form, ResponsiveEmbed, Row } from "react-bootstrap";
import { UserContext } from "../../../UserContext"
import { useForm } from 'react-hook-form';
import { Alert, Spinner } from "react-bootstrap";
import { Link, Redirect, useHistory } from 'react-router-dom';
import axios from '../../../services/AuthService'
import CredentialErrorAlert from "../Widgets/CredentialErrorAlert";
import LoadingSpinner from "../Widgets/LoadingSpinner";
import {loginUser} from "../../../services/LoginUser"

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


    const { formState: { errors, touchedFields }, register, setError, handleSubmit } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        defaultValues: {
            emial: "",
            password: ""
        }
    });

    const onSubmit = async (data, e) => {
        setLoading(true);
        let loginUrl = "";
        if (formValue.check)
            loginUrl += 'companies/login'
        else
            loginUrl += 'users/login'

        console.log("handling submit");
        e.preventDefault();
        console.log(data);
        const response = await loginUser(loginUrl, 
            {
                email: formValue.email,
                password: formValue.password
            },
            formValue.check
        )
        if (response){
            setLoading(false)
            history.push('/home')
        }
        else {
            setApiError(true)
            setLoading(false)
            setForm({
                email: '',
                password: ''
            })
        }
    
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
                                setError("mail", { typoe: "manual", message: errors.email.message })
                            }
                        }
                        }
                        isInvalid={errors.email && touchedFields.email}
                    />
                    {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
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
                            required: { value: true, message: "la contraseña es obligatorio" },
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, password: e.target.value })
                            if (errors.password) {
                                setError("password", { type: "manul", message: errors.password.message })
                            }
                        }
                        }
                        isInvalid={errors.password && touchedFields.password} />
                    {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
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
                <LoadingSpinner loading={loading} />
                <Row className="justify-content-center mx-auto ">
                    <Button variant="primary" type="submit" >Log In</Button>
                </Row>
                <Row className="justify-content-center mx-auto pt-2">
                    <CredentialErrorAlert apiError={apiError} />
                </Row>
            </Form>
        </div>
    )


};

export default LoginForm;
