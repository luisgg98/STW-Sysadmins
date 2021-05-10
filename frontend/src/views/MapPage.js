import React, {useState} from "react";
import CovidMap from "../components/mapComponents/CovidMap"
import ZitationHeader from "./../components/common/Headers/ZitationHeader"
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import MapFilterForm from "../components/mapComponents/MapFilterForm";
import Header from "../components/common/Headers/Header";

const MapPage = () => {

    const companiesState = useState([]);
    const healthZonesState = useState([]);
    const filtersState = useState({
        blackListHealthZones: [],
        minCases: 0,
        blackListCategories: []
    })

    return (
        <div>
            <Header/>
            <Container>
                <Row>
                    <h1>Incidencia Covid-19 en Zaragoza</h1>
                </Row>
                <Row>
                    <Col>
                        <CovidMap companiesState={companiesState} healthZonesState={healthZonesState}
                                  filtersState={filtersState}/>
                    </Col>
                    <Col md={4}>
                        <MapFilterForm companiesState={companiesState} healthZonesState={healthZonesState}
                                       filtersState={filtersState}/>
                    </Col>
                </Row>
            </Container>
        </div>


    );
};

export default MapPage;
