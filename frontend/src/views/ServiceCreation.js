
import React, { useEffect, useState } from "react";
import { Row, Button, Container, Col } from "react-bootstrap";
import LoadingSpinner from "../components/common/Widgets/LoadingSpinner";
import { updateCompanyInfo } from "../services/CompaniesService";

const ServiceCreation = () => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const restore = JSON.parse(localStorage.getItem("company"))
        console.log("useeffect", restore)
        if (updateCompanyInfo(restore.name)) {
            setLoading(false)
            console.log("update done")
        }
    }, [])

    return (
        <div style={{backdropFilter: "warning "}}>
            <Row className="my-auto mx-auto" style={{backgroundColor:"warning"}}>
                    {loading && <LoadingSpinner loading={true} />}
                    <Button>+</Button>
            </Row>
        </div>
    )
}

export default ServiceCreation;