import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import ZitationHeader from '../components/common/Headers/ZitationHeader'
import LoadingSpinner from '../components/common/Widgets/LoadingSpinner'
import { getCompanyData, getServiceData } from '../services/CompaniesService'

const ServiceDetailsPage = () => {
    const { nif, id } = useParams()

    const [company, setCompany] = useState()
    const [service, setService] = useState()
    const [loading, setLoading] = useState(true)
    const [hayServ, setHayServ] = useState(false)
    let googleURL = "https://www.google.com/maps/search/?api=1&query="

    async function fetchCompData() {
        const comp = await getCompanyData(nif)
        if (comp !== []) {
            setCompany(comp)
            // setLoading(false)
        }
    }

    async function fetchServiceData() {
        const resp = await getServiceData(nif, id)
        if (resp !== []) {
            setService(resp)
            // setHayServ(true)
        }
    }

    useEffect(() => {
        fetchCompData().then(() => { setLoading(false) })
        fetchServiceData().then(() => { setHayServ(true) })
    }, [])

    const Content = () => {
        if (company !== undefined && service !== undefined)
            return (
                <Card style={{ width: '60rem' }} className="text-center">
                    <Card.Header as="h5">{(company.name).toUpperCase()}</Card.Header>
                    <Card.Body>
                        <Link to={{ pathname: googleURL + company.street + "+" + company.zipcode + "+Zaragoza" }} target="_blank" rel="noopener noreferrer">
                            <Card.Title>{company.street},{company.streetnumber},{company.zipcode},Zaragoza.</Card.Title>
                        </Link>
                        <Card.Text>{(service.services.description).toUpperCase()}.</Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">Precio: {service.services.price} </Card.Footer>
                </Card>
            )
        else return < LoadingSpinner />
    }
    const BotonesHora = () => {
        if (service !== undefined)
            return (service.time_slots.map(
                (slot, index) => {
                    return <Button key={index} variant="light" className="mx-1 my-5"> {slot} </Button>
                }
            ))
    }


    const Plazas = () => {
        if (service !== undefined) {
            return (
                service.services.time_slots_service.map(
                    (slot, index) => {
                        return (
                            <Button key={index} variant="dark" className="mx-1 my-5"> Número de plazas {slot} </Button>
                        )
                    }
                )
            )
        }
    }

    return (
        <div>
            <ZitationHeader />
            <Row className="justify-content-center">
                <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                    {company !== undefined && service !== undefined && <Content className="mx-5" />}
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                    {service !== undefined && <BotonesHora />}
                </Col>

            </Row>
            <Row className="justify-content-center">
                <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                    {service !== undefined && <Plazas />}
                </Col>
            </Row>
            <Row>
                {loading && <LoadingSpinner />}
            </Row>
        </div>
    )
}


export default ServiceDetailsPage;