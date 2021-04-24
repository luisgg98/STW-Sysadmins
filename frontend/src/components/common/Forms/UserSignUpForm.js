import React, {useContext, useState} from "react";
import {UserContext} from "../../../UserContext";
import {useForm} from 'react-hook-form';
import {Button, Form, Row} from "react-bootstrap";
import {Link, useHistory} from 'react-router-dom';
import LoadingSpinner from "../Widgets/LoadingSpinner";
import {signUpUser} from "../../../services/UsersService"
import GenericAlert from "../Widgets/GenericAlert";

function UserSUForm() {

    // Datos del formulario
    const [loading, setLoading] = useState(false);


    const [formValue, setForm] = useState({
        phone: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        repassword: "",
    });

    // Mensaje de error
    const [apiError, setApiError] = useState(false);

    // Datos del usuario hacer login
    const { user, setUser } = useContext(UserContext);

    const { formState: { errors, touchedFields }, getValues, register, reset, setError, handleSubmit } = useForm({
        mode: 'onSubmit', reValidateMode: 'onBlur',
        defaultValues: {
            phone: 0,
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            repassword: ""
        }
    });


    const history = useHistory()

    const onSubmit = async (data, e) => {
        console.log("handling submit");
        setLoading(true)
        setApiError(false)

        const phonee = formValue.phone;
        setForm({...formValue, phone: Number(phonee)});

        console.log("antes de consulta", formValue)
        const resp = await signUpUser (formValue)
        reset();
        setLoading(false);
        if (!resp){
            setApiError(true)
        }
        else {
            history.push('/login')
        }
        
    }



    return (
        <div>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formSUNumber">
                    <Form.Label>Número de movil</Form.Label>
                    <Form.Control
                        type="number"
                        name="phone"
                        placeholder="Número de móvil +34..."
                        value={formValue.phone}
                        {...register("phone", {
                            required: { value: true, message: "Telefono obligatorio" },
                            minLength: { value: 9, message: "Minimo 9 digitos" },
                            maxLength: { value: 9, message: "Máximo 9 digitos" },
                            // valueAsNumber: true
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, phone: parseInt(e.target.value, 10) })
                            if (errors.phone) {
                                console.log("error phone number")
                                setError("phone", { type: "manual", message: errors.phone.message })
                            }

                        }}
                        isInvalid={errors.phone && touchedFields.phone}

                    />
                    {errors.phone && <Form.Control.Feedback type="invalid">{errors.phone.message}</Form.Control.Feedback>}
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
                        name="first_name"
                        placeholder="Nombre"
                        value={formValue.first_name}
                        {...register("first_name", {
                            required: { value: true, message: "Nombre obligatorio" },
                            maxLength: { value: 20, message: "Máximo superado" }
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, first_name: e.target.value })
                            if (errors.first_name) {
                                setError("first_name", { type: "manul", message: errors.first_name.message })
                            }
                        }}
                        isInvalid={errors.first_name&& touchedFields.first_name} />
                    {errors.first_name&& <Form.Control.Feedback type="invalid">{errors.first_name.message}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group controlId="formSULName">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Apellido"
                        name="last_name"
                        value={formValue.lanme}
                        {...register("last_name", {
                            required: { value: true, message: "Apellido obligatorio" },
                            maxLength: { value: 50, message: "Máximo superado" }
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, last_name: e.target.value })
                            if (errors.last_name) {
                                setError("last_name", { type: "manul", message: errors.last_name.message })
                            }
                        }}
                        isInvalid={errors.last_name && touchedFields.last_name} />
                    {errors.last_name && <Form.Control.Feedback type="invalid">{errors.last_name.message}</Form.Control.Feedback>}
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

                <Form.Group controlId="formSUlink">
                    <Link to="/login">
                        ¿Ya tienes una cuenta? Inicia sesión ahora!
                    </Link>
                </Form.Group>
                {loading && <LoadingSpinner loading={true} />}
                <Row className="justify-content-center mx-auto ">
                    <Button variant="primary" type="submit" onSubmit={handleSubmit(onSubmit)}>Sign Up</Button>
                </Row>
                <Row className="justify-content-center mx-auto pt-2">
                    {apiError && <GenericAlert message="Error en el registro" tipo="danger" />}
                </Row>
            </Form>
        </div >
    )
};

export default UserSUForm;
