
import React, { useEffect, useState } from "react";
import { Row, Button, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ZitationHeader from "../components/common/Headers/ZitationHeader";
import LoadingSpinner from "../components/common/Widgets/LoadingSpinner";
import { updateCompanyInfo } from "../services/CompaniesService";


const ServiceCreation = () => {
    const [loading, setLoading] = useState(true)
    const [servicios, setServicios] = useState(false)

    useEffect(() => {
        setLoading(true)
        const company = JSON.parse(localStorage.getItem("company"))
        console.log("useeffect", company)
        if (updateCompanyInfo(company.name)) {
            console.log("update done")
            setLoading(false)
        }
        if (company.hasOwnProperty("schedule")) {
            setServicios(true)
            console.log("iene service duration")
        }
    }, [])

    return (
        <Container fluid>
            <ZitationHeader />
            {loading && <Row className="my-auto mx-auto justify-content-center">
                <Col xs={1} md={1} sm={1} lg={1} xl={1}>
                    <LoadingSpinner loading={true} />

                </Col>
            </Row>}
            <Row className=" justify-content-center my-5 align-item-scenter" >

                <Link to="/services/add">
                    {!servicios && <Button  style={{ fontSize: 50, width: 1000, height: 150 }} > Añade tu primer servicio</Button>}
                </Link>
            </Row>


        </Container>
    )
}

export default ServiceCreation;