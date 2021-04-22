import React from "react";
import CovidMap from "../components/mapComponents/CovidMap"
import ZitationHeader from "./../components/common/Headers/ZitationHeader"
import {Col, Container, Row} from "react-bootstrap";

const MapPage = () => {

    return (
        <Container>
            <Col>
                <Row>
                    <ZitationHeader/>
                </Row>
                <Row>
                    <h1>Incidencia Covid-19 en Zaragoza</h1>
                </Row>
                <Row>

                </Row>
            </Col>
            <CovidMap/>
        </Container>



    );
};

export default MapPage;
