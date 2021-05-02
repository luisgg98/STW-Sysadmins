import React, {useState} from "react";
import CovidMap from "../components/mapComponents/CovidMap"
import ZitationHeader from "./../components/common/Headers/ZitationHeader"
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import MapFilterForm from "../components/mapComponents/MapFilterForm";

const MapPage = () => {

    const companiesState = useState([]);
    const healthZonesState = useState([]);
    const filtersState = useState({
        blackListHealthZones: [],
        minCases: 0,
        blackListCategories: []
    })

    return (
        <Container>
            <Row>
                <ZitationHeader/>
            </Row>
            <Row>
                <h1>Incidencia Covid-19 en Zaragoza</h1>
            </Row>
            <Row>
                <Col>
                    <CovidMap companiesState={companiesState} healthZonesState={healthZonesState}
                              filtersState={filtersState}/>
                </Col>
                <Col md={3}>
                    <MapFilterForm companiesState={companiesState} healthZonesState={healthZonesState}
                                   filtersState={filtersState}/>
                </Col>
            </Row>


        </Container>


    );
};

export default MapPage;
