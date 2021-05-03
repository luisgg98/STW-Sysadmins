import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button, Form, InputGroup, Row } from "react-bootstrap"
import { useHistory } from "react-router";
import GenericAlert from '../Widgets/GenericAlert';
import LoadingSpinner from '../Widgets/LoadingSpinner';
import { postService } from '../../../services/CompaniesService';

const AddServiceForm = () => {


    const history = useHistory();

    // Datos del formulario
    const [loading, setLoading] = useState(false);
    const [formValue, setForm] = useState({
        description: "",
        capacity: 0,
        price: 0,
    });

    // Mensaje de error
    const [apiError, setApiError] = useState(false);


    const onSubmit =  async () => {
        setLoading(true)
        const company = JSON.parse(localStorage.getItem("company"))
        console.log({
            ...formValue,
            company: company.name
        })
        const resp = await postService(
            {...formValue, company: company.name}, company.nif
        )
        reset()
        setLoading(false)
        if (!resp)
            setApiError(true)
        else {
            history.push('/cuenta')
        }
    }





    const { formState: { errors, touchedFields }, register, setError, reset, handleSubmit } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        defaultValues: {
            decription: "",
            capacity: 0,
            price: 0
        }
    });


    return (
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formDescription" >
                <Form.Label>Descripción del servicio que quiere ofrecer</Form.Label>
                <Form.Control
                    type="text"
                    name="description"
                    as="textarea"
                    rows="4"
                    placeholder="Escribe una descripción detallada del servicio"
                    {...register("description", {
                        required: { value: true, message: "Es necesaria una descripción detallada del servicio." },
                        minLength: { value: 30, message: "Se mas preciso en la descripción. Mínimo 30 carácteres" },
                        maxLength: { value: 500, message: "Carácteres de descripción excedidos" }
                    })}
                    onChange={(e) => {
                        setForm({ ...formValue, description: e.target.value })
                        if (errors.description) {
                            setError("description", { type: "manual", message: errors.description.message })
                        }
                    }
                    }
                    isInvalid={errors.description && touchedFields.description}
                />
                {errors.description && <Form.Control.Feedback type="invalid">{errors.description.message}</Form.Control.Feedback>}
                <Form.Text className="text-muted">Cuantos más detalles mejor para tus clientes.</Form.Text>
            </Form.Group>

            <Form.Group controlId="formCapacity">
                <Form.Label>Capacidad</Form.Label>
                <Form.Control
                    type="number"
                    name="capacity"
                    placeholder="1"
                    value={formValue.capacity}
                    // defaultValue="1"
                    {...register("capacity", {
                        required: { value: true, message: "Es necesario que especifiques este dato." },
                        // valueAsNumber: true
                    })}
                    onChange={(e) => {
                        setForm({ ...formValue, capacity: parseInt(e.target.value, 10) })
                        if (errors.capacity) {
                            setError("capacity", { type: "manual", message: errors.capacity.message })
                        }

                    }}
                    isInvalid={errors.capacity && touchedFields.capacity}

                />
                {errors.capacity && <Form.Control.Feedback type="invalid">{errors.capacity.message}</Form.Control.Feedback>}
                <Form.Text className="text-muted">
                    La capacidad es el número de reservas que pueden haber
                    dentro de un mismo intervalo de tiempo.</Form.Text>
            </Form.Group>

            <Form.Group controlId="precio">
                <Form.Label>Precio del servicio</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        name="price"
                        placeholder="12.99"
                        {...register("price", {
                            required: { value: true, message: "El precio del servicio es obligatorio" },
                        })}
                        onChange={(e) => {
                            // setForm({ ...formValue, price: parseFloat(e.target.value).toFixed(2) })
                            setForm({ ...formValue, price: Number(e.target.value) })
                            if (errors.price) {
                                setError("price", { type: "manual", message: errors.price.message })
                            }

                        }}
                        isInvalid={errors.price && touchedFields.price}

                    />
                    {errors.price && <Form.Control.Feedback type="invalid">{errors.price.message}</Form.Control.Feedback>}
                    <InputGroup.Append>
                        <InputGroup.Text>€</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <Form.Text className="text-muted">
                        Especifica en euros el precio del servicio que tendrá que pagar cada cliente.</Form.Text>
            </Form.Group>

            {loading && <LoadingSpinner loading={true} />}
            <Row className="justify-content-center mx-auto ">
                <Button variant="primary" type="submit" onSubmit={handleSubmit(onSubmit)}>Registrar servicio</Button>
            </Row>
            <Row className="justify-content-center mx-auto pt-2">
                {apiError && <GenericAlert message="Error en el registro del servicio" tipo="danger" />}
            </Row>
        </Form>
    )
}

export default AddServiceForm;