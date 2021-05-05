import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, CardGroup, Col } from 'react-bootstrap';
import useWindowSize from '../../../services/WindowSize';
import { deleteService } from '../../../services/CompaniesService';
import { useHistory } from 'react-router';


function ServicesCard(props) {
    const { serv, comp, nif, reservar, borrar } = props

    console.log("serv", serv)
    const [rem, setRem] = useState()
    const size = useWindowSize();

    const checkRem = () => {
        if (size.width < 607)
            setRem('15rem')
        else if (size.width < 682)
            setRem('18rem')
    }

    const borrarServicio = async () => {
        const resp = await deleteService(comp.nif, serv._id)
        if (resp) {
            console.log("servicio borrado")
            window.location.reload(false);
        }
        else
            console.log("servicio no borrado")
    }

    const history = useHistory()
    const onClick = () => {
        let id = serv._id
        console.log("id", serv._id)
        console.log("nif", nif)
        history.push('/company/' + nif + '/services/' + id)
    }

    return (
        { checkRem },
        < Col sm={12} md={12} lg={12} xl={12} className="mx-5 px-5" >
            <CardGroup className="py-1 my-1 mx-5 px-5 text-center" >
                <Card style={{ width: { rem } }}>
                    <Card.Header>{(comp.name).toUpperCase()}</Card.Header>
                    <Card.Body>
                        <Card.Text>{(serv.description).toUpperCase()}</Card.Text>
                        {reservar && <Button variant="primary" type="button" onClick={onClick}>Reservar</Button>}
                        {borrar && <Button variant="primary" type="button" onClick={borrarServicio}>Borrar Servicio</Button>}
                    </Card.Body>
                    <Card.Footer className="text-muted">{serv.price}€</Card.Footer>
                </Card>
            </CardGroup>
        </ Col >
    );
}

export default ServicesCard;
