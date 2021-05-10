import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ProfileData from "../components/common/Widgets/ProfileData";
import ZitationHeader from "../components/common/Headers/ZitationHeader";
import ServiceCreation from './ServiceCreation';
import { searchCompanies } from '../services/CompaniesService';
import Header from "../components/common/Headers/Header";

const AccountPage = () => {



    return (
        <div>
            { localStorage.getItem("logged") === "true" 
                ? (
                    <div>
                        <Header />
                        <Row fluid="md">
                            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                                <ProfileData />
                            </Col>
                            {localStorage.getItem("company") !== "{}" &&
                                <Col xs={12} sm={12} md={7} lg={7} xl={7}>
                                    <ServiceCreation className="justify-content-center mx-auto" />
                                </Col>}
                        </Row>
                    </div>


                ) : (
                    <Redirect to="/login" />
                )}


        </div>
    );
}

export default AccountPage;
