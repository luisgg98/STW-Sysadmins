
import React, { useState } from 'react'
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const CompanyDetails = (props) => {
    const { company } = props;
    let googleURL = "https://www.google.com/maps/search/?api=1&query="

    const [showTime, setShowTime] = useState(false)

    const horario = company.schedule;
    const TimeTable = () => {
        console.log("horario", horario)
        return (
            <div>
                LUNES  {horario.monday.open_1} a { horario.monday.close_1}<br />
                    LUNES   {horario.monday.open_2} a  {horario.monday.close_2}<br />
                    MARTES  {horario.tuesday.open_1} a  {horario.tuesday.close_1}<br />
                    MARTES  {horario.tuesday.open_2} a  {horario.tuesday.close_2}<br />
                    MIERCOLES  {horario.wednesday.open_1} a  {horario.wednesday.close_1}<br />
                    MIERCOLES   {horario.wednesday.open_2} a  {horario.wednesday.close_2}<br />
                    JUEVES  {horario.thursday.open_1} a  {horario.thursday.close_1}<br />
                    JUEVES  {horario.thursday.open_2} a  {horario.thursday.close_2}<br />
                    VIERNES  {horario.friday.open_1} a  {horario.friday.close_1}<br />
                    VIERNES  {horario.friday.open_2} a  {horario.friday.close_2}<br />
                    SÁBADO  {horario.saturday.open_1} a  {horario.saturday.close_1}<br />
                    SÁBADO {horario.saturday.open_2} a  {horario.saturday.close_2}<br />
                    DOMINGO   {horario.sunday.open_1} a  {horario.sunday.close_1}<br />
                    DOMINGO  {horario.sunday.open_2} a  {horario.sunday.close_2}<br />
            </div>
        )
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
