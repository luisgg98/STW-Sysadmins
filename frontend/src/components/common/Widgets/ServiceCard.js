import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button, CardGroup} from 'react-bootstrap';


function ServicesCard(props) {
    console.log("services card", props.serv)
    console.log("service card comp", props.comp)
    return (
        <CardGroup className="py-1 my-1">
            <Card style={{ width: '50rem' }}>
                <Card.Header>{props.comp.name}</Card.Header>
                <Card.Body>
                    <Card.Title >{props.comp.street} {props.comp.streetnum} {props.comp.zipcode}</Card.Title>
                    <Card.Text>{props.serv.description}</Card.Text>
                    <Button variant="primary">Reservar</Button>
                </Card.Body>
                <Card.Footer className="text-muted">{props.serv.price}€</Card.Footer>
            </Card>
        </CardGroup>
    );
}

export default ServicesCard;
