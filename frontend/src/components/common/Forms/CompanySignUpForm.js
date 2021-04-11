import React, { useState, useContext } from "react";
import { UserContext } from "../../../UserContext";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { Form, Alert, Spinner, Row, Button, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

const CompanySignUpForm = () => {

    // Datos del formulario
    const [loading, setLoading] = useState(false);


    axios.interceptors.request.use((config) => {
        console.log(config);
        return config;
    },
        function (error) {
            return Promise.reject(error);
        });

    const [formValue, setForm] = useState({
        nif: "",
        nombre: "",
        email: "",
        password: "",
        repassword: "",
        lat: 0,
        long: 0
    });

    // Mensaje de error
    const [apiError, setApiError] = useState(false);

    // Datos del usuario hacer login
    const { user, setUser } = useContext(UserContext);

    const { formState: { errors, touchedFields, isValid }, getValues, register, reset, setError, handleSubmit } = useForm({
        mode: 'onSubmit', reValidateMode: 'onBlur',
        defaultValues: {
            nif: "",
            nombre: "",
            email: "",
            password: "",
            repassword: "",
            lat: 41.65606,
            long: -0.87734
        }
    });


    axios.interceptors.request.use((config) => {
        console.log(config);
        return config;
    },
        function (error) {
            return Promise.reject(error);
        });

    // function handleConfirmPassword(event) {
    //     if (event.target.value !== formValue.password) {
    //         console.log("error");
    //         setForm({ ...formValue, confirmPassword: event.target.value });
    //     } else setForm({ ...formValue, confirmPassword: event.target.value });
    // }

    const onSubmit = async (data, e) => {
        console.log("handling submit");
        e.preventDefault();
        console.log(e);
        console.log(data);
        reset();

        // const phonee = formValue.phone;
        // setForm({ ...formValue, phone: Number(phonee) });
        const dataa = {
            nif: formValue.nif,
            name: formValue.nombre,
            email: formValue.email,
            password: formValue.password,
            lat: formValue.lat,
            long: formValue.long
        }
        setLoading(true);
        try {
            const response = await axios.post(`https://stw-zitation.herokuapp.com/api/companies/register`, dataa,
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
                <Form.Group controlId="formSUNumber">
                    <Form.Label>Nif de la empresa</Form.Label>
                    <Form.Control
                        type="text"
                        name="nif"
                        placeholder="A12345678"
                        value={formValue.nif}
                        {...register("nif", {
                            required: { value: true, message: "Nif obligatorio" },
                            minLength: { value: 9, message: "Minimo 9 digitos" },
                            maxLength: { value: 9, message: "Máximo 9 digitos" },
                            // valueAsNumber: true
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, nif: e.target.value })
                            if (errors.nif) {
                                console.log("error nif number")
                                setError("nif", { type: "manual", message: errors.nif.message })
                            }

                        }}
                        isInvalid={errors.nif}

                    />
                    {errors.nif && <Form.Control.Feedback type="invalid">{errors.nif.message}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formValue.email}
                        {...register("email", {
                            required: { value: true, message: "Email obligatorio" },
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Formato de email incorrecto"
                            }
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, email: e.target.value })
                            if (errors.email) {
                                setError("email", { type: "manual", message: errors.email.message })
                            }
                        }}
                        isInvalid={errors.email && touchedFields.email}
                    />
                    {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group controlId="formSUFName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formValue.nombre}
                        {...register("nombre", {
                            required: { value: true, message: "Nombre obligatorio" },
                            maxLength: { value: 20, message: "Máximo superado" }
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, nombre: e.target.value })
                            if (errors.nombre) {
                                setError("nombre", { type: "manul", message: errors.nombre.message })
                            }
                        }}
                        isInvalid={errors.nombre && touchedFields.nombre} />
                    {errors.nombre && <Form.Control.Feedback type="invalid">{errors.nombre.message}</Form.Control.Feedback>}
                </Form.Group>


                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        value={formValue.password}
                        {...register("password", {
                            required: { value: true, message: "la contraseña es obligatorio" },
                            minLength: { value: 8, message: "minimo 8 carácteres" },
                            pattern: { value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, message: "Debe contener mayus, números y simbolos" }
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

                <Form.Group controlId="formSUConfPassword">
                    <Form.Label>Confirmar Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Repite contraseña"
                        name="repassword"
                        value={formValue.repassword}
                        {...register("repassword", {
                            // validate: {value: getValues().password === getValues().repassword, message: "Las contrasenas no coinciden"}, 
                            validate: value =>
                                value === getValues().password || "Las contraseñas no coinciden",
                            required: { value: true, message: "la contraseña es obligatorio" },
                            minLength: { value: 8, message: "minimo 8 carácteres" },
                            // pattern: { value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, message: "Debe contener mayus, números y simbolos" }
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, repassword: e.target.value })
                            if (errors.repassword) {
                                setError("repassword", { type: "manul", message: errors.repassword.message })
                            }
                        }
                        }
                        isInvalid={errors.repassword && touchedFields.repassword} />
                    {errors.repassword && <Form.Control.Feedback type="invalid">{errors.repassword.message}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group controlId="formSULName">
                    <Row>
                        <Col>
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="latitud"
                                name="lat"
                                value={formValue.lanme}
                                {...register("lat", {
                                    required: { value: true, message: "Apellido obligatorio" },
                                    maxLength: { value: 50, message: "Máximo superado" }
                                })}
                                onChange={(e) => {
                                    setForm({ ...formValue, lat: parseInt( e.target.value) })
                                    if (errors.lat) {
                                        setError("lat", { type: "manul", message: errors.lat.message })
                                    }
                                }}
                                isInvalid={errors.lat && touchedFields.lat} />
                            {errors.lat && <Form.Control.Feedback type="invalid">{errors.lat.message}</Form.Control.Feedback>}
                        </Col>
                        <Col>
                            <Form.Label>Longuitud</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Longuitud"
                                name="long"
                                value={formValue.lanme}
                                {...register("long", {
                                    required: { value: true, message: "Apellido obligatorio" },
                                    maxLength: { value: 50, message: "Máximo superado" }
                                })}
                                onChange={(e) => {
                                    setForm({ ...formValue, long: parseInt(e.target.value) })
                                    if (errors.long) {
                                        setError("long", { type: "manul", message: errors.long.message })
                                    }
                                }}
                                isInvalid={errors.long && touchedFields.long} />
                            {errors.long && <Form.Control.Feedback type="invalid">{errors.long.message}</Form.Control.Feedback>}
                        </Col>
                    </Row>

                </Form.Group>

                <Form.Group controlId="formSUlink">
                    <Link to="/login">
                        ¿Ya tienes una cuenta? Inicia sesión ahora!
                    </Link>
                </Form.Group>
                <LoadingSpinner />
                <Row className="justify-content-center mx-auto ">
                    <Button variant="primary" type="submit" onSubmit={handleSubmit(onSubmit)}>Sign Up</Button>
                </Row>
                <Row className="justify-content-center mx-auto pt-2">
                    <AlertMessage />
                </Row>
            </Form>
        </div >
    )
}

export default CompanySignUpForm;
