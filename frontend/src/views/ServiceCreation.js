
import React, { useEffect, useState } from "react";
import { Row, Button, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/common/Widgets/LoadingSpinner";
import ServicesCard from "../components/common/Widgets/ServiceCard";
import { getServices, updateCompanyInfo } from "../services/CompaniesService";
import Header from "../components/common/Headers/Header";


const ServiceCreation = () => {
    const [loading, setLoading] = useState(true)
    const [hayServicios, setHayServicios] = useState(false)
    const [servicios, setServicios] = useState([])
    const [comp, setComp] = useState()

    async function fetch(nif) {
        const resp = await getServices(nif)
        setServicios(resp.services)
        setHayServicios(true)
        setLoading(false)
    }
    useEffect(async () => {
        const company = JSON.parse(localStorage.getItem("company"))
        fetch(company.nif)
        console.log("useeffect", company)
        if (updateCompanyInfo(company.name)) {
            console.log("update done")
            setComp(company)
        }

    }, [])

    return (
        <div>
            <Header/>
            <Container fluid>
                {loading && <Row className="my-auto mx-auto justify-content-center">
                    <Col xs={1} md={1} sm={1} lg={1} xl={1}>
                        <LoadingSpinner loading={true} />

                    </Col>
                </Row>}
                <Row className=" justify-content-center my-5 align-item-scenter" >

                    <Row className="justify-content-center">
                        {servicios !== undefined && servicios.map((serv, index) => {
                            return <ServicesCard key={index} serv={serv} comp={comp} reservar={false} borrar={true} />
                        })}
                    </Row>

                    <Link to="/services/add">
                        {hayServicios
                            ? (
                                <Button style={{ fontSize: 20, width: 500, height: 50 }} >
                                    Añade otro servicio
                                </Button>
                            )
                            : (
                                <Button style={{ fontSize: 20, width: 500, height: 50 }} >
                                    Añade tu primer servicio
                                </Button>
                            )
                        }
                    </Link>
                </Row>


            </Container>
        </div>

    )
}

export default ServiceCreation;
