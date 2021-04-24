import React, {useEffect, useState} from 'react';
import { Container, Row } from "react-bootstrap";
import { Redirect } from 'react-router';
import AddServiceForm from '../components/common/Forms/AddServiceForm';
import ZitationHeader from '../components/common/Headers/ZitationHeader';



const AddService = () => {

    const [servicios, setServicios] = useState(false)

    useEffect(() => {
        const company = localStorage.getItem("company")
        if (!company.hasOwnProperty("service_duration"))
            console.log("no tiene servicios regidiri")
            setServicios(false)
    }, [])
    return (
        <div>
            <ZitationHeader />

            { servicios 
            ? (<Redirect to="/services" ></Redirect>)
            : (
                <Row className="justify-content-center mt-3">
                    <AddServiceForm />
                </Row>    
                )
            }
        </div>
    )
}

export default AddService;