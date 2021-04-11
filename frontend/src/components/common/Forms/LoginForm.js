import React, {useState, useContext} from "react";
import {Button, Form, Row} from "react-bootstrap";
import {UserContext} from "../../../UserContext"
import axios from 'axios';
import {useForm} from 'react-hook-form';
import {Alert} from "react-bootstrap";


const LoginForm = () => {
    // Datos del usuario hacer login
    const [, setUser] = useContext(UserContext);

    // Datos del formulario
    const [formValue, setForm] = useState({
        email: "",
        password: "",
    });

    // Mensaje de error
    const [error, setError] = useState("");


    const {formState: {errors, touchedFields}, register, handleSubmit} = useForm();

    const onSubmit = async (e, data) => {
        console.log("handling submit");

        require('axios-debug-log')
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
            setError({type: true})
            setForm({
                email: '',
                password: ''
            })
            setUser({
                email: ''
            })

        }
    }

    const AlertMessage = () => {
        if (error) {
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
                            required: {value: true, message: "Password is required"},
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Wrong email format"
                            }
                        })}
                        onChange={(e) => {
                            setForm({...formValue, email: e.target.value})
                            if (errors.email) {
                                // console.log("hay error");
                                // console.log(errors.password.message)
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
                            required: true,
                            // minLength: { value: 8, message: "minimum legth is 8" },
                            // pattern: { value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, message: "Password must contain uppercase, lowercase, simbol and numbers." }
                        })}
                        onChange={(e) => {
                            setForm({...formValue, password: e.target.value})
                            if (errors.password) {
                                // console.log("hay error");
                                // console.log(errors.password.message)
                                setError(errors.password.message)
                            }
                        }
                        }
                        isInvalid={errors.password && touchedFields.password}/>
                    <Form.Control.Feedback type="invalid">Min legth is 8. Must contain uppercase, symbol and
                        numbers.</Form.Control.Feedback>
                </Form.Group>
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
