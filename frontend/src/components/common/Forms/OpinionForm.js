import React, {useState} from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";
import {createCompanyOpinion} from "../../../services/OpinionsService";

function OpinionForm(props) {

    const [validated, setValidated] = useState(false);
    const [comentario, setComentario] = useState("")
    const [stars, setStars] = useState()

    function handleSubmit() {
        setValidated(true);
        let user = JSON.parse(localStorage.getItem("user"))
        createCompanyOpinion(props.nif, comentario, stars, user.id).then(r => window.location.reload())

    }

    return (
        <Container>
            <h3>Deja tu comentario</h3>
            <Form validated={validated}>
                <Form.Row>
                    <Col>
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control required type="text" placeholder="Escribe aqui..."
                                      onChange={(event) => setComentario(event.target.value)}/>
                    </Col>
                    <Col>
                        <Form.Label>Valoración</Form.Label>
                        <Form.Control as="select" custom onChange={(event) => setStars(event.target.value)}>
                            {[...Array(6).keys()].map((op) => <option value={op}>{op}</option>)}
                        </Form.Control>
                    </Col>

                </Form.Row>
                <br/>
                <Button variant="primary" onClick={handleSubmit}>Enviar</Button>
            </Form>
        </Container>
    );
}

export default OpinionForm;
