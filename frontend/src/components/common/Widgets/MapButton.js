import React from "react";
import {Button, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const MapButton = () => {
    return (
        <Row className="justify-content-center mx-auto pt-3">
            <Link to='/mapa'>
            <Button id="mapButton" size="lg">Mapa incidencia COVID-19 en Zaragoza</Button>
        </Link>
        </Row>
    )
};

export default MapButton;
