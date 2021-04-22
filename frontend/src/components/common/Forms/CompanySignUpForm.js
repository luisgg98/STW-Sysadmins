import React, {useContext, useState} from "react";
import {UserContext} from "../../../UserContext";
import {useForm} from 'react-hook-form';
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, useHistory} from 'react-router-dom';
import LoadingSpinner from "../Widgets/LoadingSpinner"
import GenericAlert from "../Widgets/GenericAlert";
import {signUpCompany} from "../../../services/SignUpCompany"


const CompanySignUpForm = () => {

    // Datos del formulario
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);

    const [formValue, setForm] = useState({
        nif: "",
        nombre: "",
        email: "",
        password: "",
        repassword: "",
        categoria: "",
        lat: "",
        long: ""
    });


    // Datos del usuario hacer login
    const { user, setUser } = useContext(UserContext);

    const { formState: { errors, touchedFields }, getValues, register, reset, setError, handleSubmit } = useForm({
        mode: 'onSubmit', reValidateMode: 'onBlur',
        defaultValues: {
            nif: "",
            nombre: "",
            email: "",
            password: "",
            repassword: "",
            categoria: "",
            lat: "",
            long: "",
        }
    });



    const history = useHistory()

    const onSubmit = async (data, e) => {
        setLoading(true)
        setApiError(false);
        const resp = await signUpCompany({
            nif: formValue.nif,
            name: formValue.nombre,
            email: formValue.email,
            password: formValue.password,
            lat: formValue.lat,
            long: formValue.long,
            address: "address",
            category: formValue.categoria
        })
        setLoading(false)
        reset()
        if (!resp) {
            console.log("error")
            setApiError(true)
        }
        else {
            console.log("exito from compnaysingun")
            history.push('/login')
        }
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
                            maxLength: { value: 40, message: "Máximo superado" }
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

                <Form.Group >
                    <Row>
                        <Col>
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control
                                id="lat"
                                type="text"
                                placeholder="Latitud"
                                name="lat"
                                value={formValue.lanme}
                                {...register("lat", {
                                    required: { value: true, message: "Apellido obligatorio" },
                                    maxLength: { value: 50, message: "Máximo superado" }
                                })}
                                onChange={(e) => {
                                    setForm({ ...formValue, lat: parseFloat(e.target.value) })
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
                                id="long"
                                type="text"
                                placeholder="Longuitud"
                                name="long"
                                value={formValue.lanme}
                                {...register("long", {
                                    required: { value: true, message: "Apellido obligatorio" },
                                    maxLength: { value: 50, message: "Máximo superado" }
                                })}
                                onChange={(e) => {
                                    setForm({ ...formValue, long: parseFloat(e.target.value) })
                                    if (errors.long) {
                                        setError("long", { type: "manul", message: errors.long.message })
                                    }
                                }}
                                isInvalid={errors.long && touchedFields.long} />
                            {errors.long && <Form.Control.Feedback type="invalid">{errors.long.message}</Form.Control.Feedback>}
                        </Col>
                    </Row>

                </Form.Group>

                <Form.Group controlId="formSUCat">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                        as="select"
                        name="categoria"
                        value={formValue.categoria}
                        {...register("categoria", {
                            required: { value: true, message: "La categoria es obligatorio" },
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, categoria: e.target.value })
                            if (errors.categoria) {
                                setError("categoria", { type: "manul", message: errors.categoria.message })
                            }
                        }
                        }
                        isInvalid={errors.categoria && touchedFields.categoria}
                        custom >
                        <option>Ocio</option>
                        <option>Salud y Belleza</option>
                        <option>Deporte</option>
                        <option>Administración pública</option>
                        <option>Comercio</option>
                    </Form.Control>
                    {errors.categoria && <Form.Control.Feedback type="invalid">{errors.categoria.message}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group controlId="formSUlink">
                    <Link to="/login">
                        ¿Ya tienes una cuenta? Inicia sesión ahora!
                    </Link>
                </Form.Group>
                {loading && <LoadingSpinner loading={true}/>}
                <Row className="justify-content-center mx-auto ">
                    <Button variant="primary" type="submit" onSubmit={handleSubmit(onSubmit)}>Sign Up</Button>
                </Row>
                <Row className="justify-content-center mx-auto pt-2">
                    {apiError && <GenericAlert message="Error en el registro" tipo="danger" />}
                </Row>
            </Form>
        </div >
    )
}

export default CompanySignUpForm;
