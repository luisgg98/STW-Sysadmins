import React, {useEffect, useState} from 'react';
import {Card, Row, Form, Container} from 'react-bootstrap';
import {Col} from "antd";
import {getCompanyOpinions} from "../../../services/OpinionsService";
import OpinionForm from "../Forms/OpinionForm";

function CompanyOpinion(props) {
    return (
        <Card style={{width: "50%"}}>
            <Card.Header>
                <Row className="mx-0">
                    <strong>{props.user}</strong>
                </Row>
                <Row className="mx-1">
                    Valoración: {props.stars}
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>{props.text}</Card.Text>
                <footer className="blockquote-footer">{props.date}</footer>
            </Card.Body>
        </Card>
    );
}

function CompanyOpinions(props) {

    const [company_opinions, setCompanyOpinions] = useState([])

    useEffect(() => {
        getCompanyOpinions(props.nif).then((response) => {
            setCompanyOpinions(response.data)
        })
    }, []);

    return (
        <Container>
            <Row className="justify-content-center">
                <h2>Comentarios</h2>
            </Row>
            <Row className="justify-content-center">
                {company_opinions.length > 0 ?
                    <Container className="border-0"
                          style={{overflowY: "auto", maxHeight: "30vh", overflowX: "hidden"}}>
                        {
                            company_opinions.map((company_opinion) => (
                                <Row className="p-1 justify-content-center">
                                    <CompanyOpinion key={company_opinion._id} user={company_opinion.name}
                                                    text={company_opinion.comment} date={company_opinion.date}
                                                    stars={company_opinion.stars}/>
                                </Row>
                            ))
                        }
                    </Container> : <div>¡¡De momento no hy comentarios, puedes ser el primero!!</div>}

            </Row>
        </Container>
    )
}

export default CompanyOpinions;
