import React, { useState, useEffect } from 'react'
import { getCompanyData, getServices } from '../services/CompaniesService'
import { useParams } from 'react-router-dom'
import ZitationHeader from '../components/common/Headers/ZitationHeader'
import { Col, Row } from 'react-bootstrap'
import ServicesCard from '../components/common/Widgets/ServiceCard'
import CompanyDetails from '../components/common/Widgets/CompanyDetails'
import LoadingSpinner from '../components/common/Widgets/LoadingSpinner'

const CompanyDetailsPage = (props) => {

    const [compData, setCompData] = useState()
    const [loading, setLoading] = useState(true)
    const [servicios, setServicios] = useState()
    const [hayServ, setHayServ] = useState(false)

    const { nif } = useParams()

    async function fetchServices() {
        const resp = await getServices(nif)
        if (resp !== []) {
            setServicios(resp)
            console.log("setting services")
            setHayServ(true)
        }
    }
    async function fetchCompany() {
        const resp = await getCompanyData(nif)
        if (resp !== []) {
            setCompData(resp)
            console.log("setting comp data")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchServices()
        // .then(setLoading(false))
        fetchCompany()
        // .then(setHayServ(true))
    }, [])





    const ServicesCompany = () => {
        if (servicios !== undefined && hayServ) {
            return (servicios.services.map(
                (servicio, index) => {
                    return <ServicesCard key={index} serv={servicio} comp={compData}  nif={nif} reservar={true} borrar={false} />
                }
            ))
        }
        else {
            return (<LoadingSpinner />)
        }
    }



    return (
        <div>
            <ZitationHeader />
            {loading && <LoadingSpinner />}
            <Row className="justify-content-center">
                <Col xl={6} lg={6} md={6} sm={6}>
                    {compData !== undefined && <CompanyDetails company={compData} />}
                </Col>

                <Col xl={6} lg={6} md={6} sm={6}>
                    {servicios !== undefined && compData !== undefined && <Row className="justify-content-center" > <h5 >  SERVICIOS DE {(compData.name).toUpperCase()}</h5></Row>}
                    {servicios !== undefined && compData !== undefined  ? <ServicesCompany /> : <LoadingSpinner />}
                </Col>

            </Row>
        </div>
    )
}

export default CompanyDetailsPage;