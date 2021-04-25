
import React, { useEffect, useState } from "react";
import { Row, Button, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ZitationHeader from "../components/common/Headers/ZitationHeader";
import LoadingSpinner from "../components/common/Widgets/LoadingSpinner";
import ServicesCard from "../components/common/Widgets/ServiceCard";
import { getServices, updateCompanyInfo } from "../services/CompaniesService";


const ServiceCreation = () => {
    const [loading, setLoading] = useState(true)
    const [hayServicios, setHayServicios] = useState(false)
    const [servicios, setServicios] = useState([])
    const [comp, setComp] = useState()

    useEffect(() => {

        setLoading(true)
        const company = JSON.parse(localStorage.getItem("company"))
        console.log("useeffect", company)
        if (updateCompanyInfo(company.name)) {
            console.log("update done")
            setComp(company)
        }
        getServices(company.nif).then(
            resp => {
                console.log(".then services", resp)
                setServicios(resp)
                if (resp.length > 0) {
                    setHayServicios(true)
                    console.log("long mayor que 0")
                }
                setLoading(false)
            }
        )
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

                {hayServicios && <div className="display-4">Servicio de {comp.name}</div>}
                {hayServicios && servicios.map((serv, index) => {
                    console.timeLog("en el map de servicios")
                    return <ServicesCard key={index} serv={serv} comp={comp} />
                })}

                <Link to="/services/add">
                    {hayServicios
                        ? (
                            <Button style={{ fontSize: 20, width: 500, height: 50 }} >
                                Añade otro servicio
                            </Button>
                        )
                        : (
                            <Button style={{ fontSize: 50, width: 1000, height: 150 }} >
                                Añade tu primer servicio
                            </Button>
                        )
                    }
                </Link>
            </Row>


        </Container>
    )
}

export default ServiceCreation;