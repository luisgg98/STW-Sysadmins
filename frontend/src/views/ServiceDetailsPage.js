import React, { useState, useEffect } from 'react'
import { Tab, Button, Card, Col, Row, Table, Tabs } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/common/Widgets/LoadingSpinner'
import {getCompanyData, getServiceData} from '../services/CompaniesService'
import Header from "../components/common/Headers/Header";
import CalendarWidget from "../components/common/Widgets/CalendarWidget";


const ServiceDetailsPage = () => {

    const {nif, id} = useParams()

    const [company, setCompany] = useState()
    const [service, setService] = useState()
    const [loading, setLoading] = useState(true)
    const [hayServ, setHayServ] = useState(false)
    let googleURL = "https://www.google.com/maps/search/?api=1&query="

    async function fetchCompData() {
        const comp = await getCompanyData(nif)
        if (comp !== []) {
            setCompany(comp)
        }
    }

    async function fetchServiceData() {
        const resp = await getServiceData(nif, id)
        if (resp !== []) {
            setService(resp)
        }
    }

    useEffect(() => {
        fetchCompData().then(() => {
            setLoading(false)
        })
        fetchServiceData().then(() => {
            setHayServ(true)
        })
    }, [])

    const Content = () => {
        if (company !== undefined && service !== undefined)
            return (
                <Card style={{width: '60rem'}} className="text-center">
                    <Card.Header as="h5">{(company.name).toUpperCase()}</Card.Header>
                    <Card.Body>
                        <Link to={{pathname: googleURL + company.street + "+" + company.zipcode + "+Zaragoza"}}
                              target="_blank" rel="noopener noreferrer">
                            <Card.Title>{company.street},{company.streetnumber},{company.zipcode},Zaragoza.</Card.Title>
                        </Link>
                        <Card.Text>{(service.services.description).toUpperCase()}.</Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">Precio: {service.services.price} </Card.Footer>
                </Card>
            )
        else return < LoadingSpinner/>
    }

    return (
        console.log("serv", service),
            <div>
                <Header/>
                <Row className="justify-content-center">
                    <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                        {company !== undefined && service !== undefined && <Content className="mx-5"/>}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    {/*<Col xl={12} lg={12} md={12} sm={12} xs={12}>*/}
                        {service !== undefined && <CalendarWidget service={service} company={company}/>}
                    {/*</Col>*/}


                </Row>

                {/*<Row className="justify-content-center">*/}
                {/*    <Col xl={7} lg={7} md={7} sm={7} xs={7}>*/}
                {/*        {service !== undefined && <Plazas/>}*/}
                {/*    </Col>*/}
                {/*</Row>*/}

                <Row>
                    {loading && <LoadingSpinner/>}
                </Row>
            </div>
    )
}

export default  ServiceDetailsPage;