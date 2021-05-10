import React, {useState, useEffect} from 'react'
import {Button, Card, Col, Row} from 'react-bootstrap'
import {Link, useParams} from 'react-router-dom'
import ZitationHeader from '../components/common/Headers/ZitationHeader'
import LoadingSpinner from '../components/common/Widgets/LoadingSpinner'
import {getCompanyData, getServiceData} from '../services/CompaniesService'
import Header from "../components/common/Headers/Header";

const ServiceDetailsPage = () => {
    const {nif, id} = useParams()

    const [company, setCompany] = useState()
    const [service, setService] = useState()
    const [loading, setLoading] = useState(true)
    const [hayServ, setHayServ] = useState(false)
    let googleURL = "https://www.google.com/maps/search/?api=1&query="


    const time_slots_service = {
        "monday_1": {
            "places_left": [2, 2],
            "slots": ["9:00", "9:30"]
        },
        "monday_2": {
            "places_left": [2, 2],
            "slots": ["16:00", "16:30"]
        },
        "tuesday_2": {
            "places_left": [2, 2],
            "slots": ["16:00", "16:30"]
        }
    }

    const service2 = {
        time_slots_service
    }

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

    const TableContent = (props) => {
        const { slots, placesLeft, size } = props
        console.log("size", size)
        return slots.map( 
            (content, index) => {
                return (
                    <tr>
                        <td>
                            <Button>
                                {slots[index]}
                            </Button>
                        </td>
                        <td>
                            Huecos: {placesLeft[index]}
                        </td>
                    </tr>
                )
            }
        ) 
    }

    //genera una tabla con un numero de filas igual al tamaño de service2.time_slots_service.monday_1.slots
    const TablaHorario = (props) => {
        const { slots, placesLeft } = props
        console.log("slots", slots)
        const rows = slots.length
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Franjas horarias disponibles</th>
                        <th>Huecos disponibles</th>
                    </tr>
                </thead>
                <tbody>
                    <TableContent slots={slots} placesLeft={placesLeft} size={rows} />
                </tbody>
            </Table>
        )
    }

    const TabItemss = () => {
        console.log("tabitem")
        let count = []
        for (let key of Object.keys(service2.time_slots_service)) {
            if (service2.time_slots_service[key].length !== 0) {
                console.log("keyyy", key)
                count.push(key)
            }
        }

        return (
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                {count.map((data, index) => {
                    let reff = "#" + data
                    return (
                        <Tab key={index} eventKey={reff} title={data.substr(0, data.indexOf('_')).toUpperCase()}>
                            <TablaHorario slots={service2.time_slots_service[data].slots} placesLeft={service2.time_slots_service[data].places_left} />
                        </Tab>
                    )
                })}
            </Tabs>
        )


    }

    const CardHorario = () => {
        return (
            <TabItemss />
        )
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
                <Col xl={7} lg={7} md={7} sm={7} xs={7}>

                    {service !== undefined && <BotonesHora/>}
                </Col>

            </Row>
            <Row className="justify-content-center">
                <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                    {service !== undefined && <Plazas/>}
                </Col>
            </Row>

            <Row>
                {loading && <LoadingSpinner/>}
            </Row>
        </div>
    )
}


export default ServiceDetailsPage;
