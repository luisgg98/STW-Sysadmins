
import React, { useState } from 'react'
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const Horario = (props) => {
    const { dia, horario } = props
    return (
        <div>
            {horario[dia].open_1}
            {horario[dia].close_1}
            {horario[dia].open_2}
            {horario[dia].close_2}
        </div>
    )
}

const Mostrar= (props) =>{
    const {dato} = props
    return (
        JSON.stringify(dato)
    )
}

const CompanyDetails = (props) => {
    const { company } = props;
    let googleURL = "https://www.google.com/maps/search/?api=1&query="

    const [showTime, setShowTime] = useState(false)

    const horario = company.schedule;
    const TimeTable = () => {
        console.log("horario", horario)
        for (let key of Object.keys(horario)) {
            if (horario[key] !== {})
                return (
                    <div>
                        <Mostrar dato={horario[key]} />
                    </div>
                )
        }
    }

    return (
        <div>
            <Card className="text-center">
                <Card.Header as="h5">{(company.name).toUpperCase()}</Card.Header>
                <Card.Body>
                    <Link to={{ pathname: googleURL + company.street + "+" + company.zipcode + "+Zaragoza" }} target="_blank" rel="noopener noreferrer">
                        <Card.Title>{(company.street).toUpperCase()},{company.streetnumber},{company.zipcode},ZARAGOZA.</Card.Title>
                    </Link>
                    <Card.Text>{(company.description).toUpperCase()}</Card.Text>
                </Card.Body>
                <Card.Header>
                    <Button variant="primary" onClick={() => setShowTime(!showTime)}>Mostrar Horario</Button>
                </Card.Header>
            </Card>
            <Row className="justify-content-center">
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>

                    {showTime && < TimeTable />}
                </Col>

            </Row>
        </div >
    )
}

export default CompanyDetails;
