import React from 'react';

import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import UsersTable from "../components/adminComponents/UsersTable";
import TopCompaniesBar from "../components/adminComponents/TopCompaniesBar";
import TopTimeZoneBar from "../components/adminComponents/TopTimeZoneBar";
import BookingsBycategoriePie from "../components/adminComponents/BookingsByCategoryPie";
import CompaniesTable from "../components/adminComponents/CompaniesTable";
import ZitationHeader from "../components/common/Headers/ZitationHeader";

function AdminPage() {


    return (
        <Container>
            <ZitationHeader/>
            <h1>Dashboard</h1>
            <Tabs defaultActiveKey="estadisticas">
                <Tab eventKey="estadisticas" title="Estadisticas">
                    <Row>
                        <Col>
                            <TopCompaniesBar/>
                        </Col>
                        <Col>
                            <TopTimeZoneBar/>
                        </Col>
                    </Row>
                    <Row>
                        <BookingsBycategoriePie/>
                    </Row>
                </Tab>
                <Tab eventKey="usuarios" title="Usuarios">
                    <UsersTable/>
                </Tab>
                <Tab eventKey="companias" title="Compañias">
                    <CompaniesTable/>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default AdminPage;
