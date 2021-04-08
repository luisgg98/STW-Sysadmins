import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MapButton = () => {
    return <Link to='/mapa'>
        <Button>Mapa incidencia Covid-19 en Zaragoza</Button>
    </Link>;
};

export default MapButton;
