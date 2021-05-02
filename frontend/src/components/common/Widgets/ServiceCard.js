import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, CardGroup, Col } from 'react-bootstrap';
import useWindowSize from '../../../services/WindowSize';


function ServicesCard(props) {
    const [rem, setRem] = useState()
    const size = useWindowSize();

    const checkRem = () => {
        if (size.width < 607)
            setRem('15rem')
        else if (size.width < 682)
            setRem('18rem')
    }
    return (
        { checkRem },
        < Col sm = { 12 } md = { 12} lg = { 12} xl = { 12} className = "mx-5 px-5" >
            <CardGroup className="py-1 my-1 mx-5 px-5">
                <Card style={{ width: {rem} }}>
                    <Card.Header>{props.comp.name}</Card.Header>
                    <Card.Body>
                        <Card.Title >{props.comp.street} {props.comp.streetnum} {props.comp.zipcode}</Card.Title>
                        <Card.Text>{props.serv.description}</Card.Text>
                        <Button variant="primary">Reservar</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">{props.serv.price}€</Card.Footer>
                </Card>
            </CardGroup>
        </ Col >
    );
}

export default ServicesCard;
