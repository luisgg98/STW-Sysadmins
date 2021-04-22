import React, {useEffect, useState} from 'react';

import {Card, Col, Container, Row} from "react-bootstrap";
import UsersTable from "../components/adminComponents/UsersTable";
import TopCompaniesBar from "../components/adminComponents/TopCompaniesBar";
import TopTimeZoneBar from "../components/adminComponents/TopTimeZoneBar";
import BookingsBycategoriePie from "../components/adminComponents/BookingsByCategoryPie";

function AdminPage() {



    return (
        <Container >
            <Row>
                <Col>
                    <Card bg="Light">
                        <UsersTable />
                    </Card>
                    <Card bg="Light">
                        <TopCompaniesBar />
                    </Card>
                </Col>
                <Col>
                    <Card bg="Light">
                        <TopTimeZoneBar />
                    </Card>
                    <Card bg="Light">
                        <BookingsBycategoriePie />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminPage;
