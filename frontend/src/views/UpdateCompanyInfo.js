import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import UpdateCompanyInfoForm from '../components/common/Forms/UpdateCompanyInfoForm'
import ZitationHeader from '../components/common/Headers/ZitationHeader';



const UpdateCompanyInfo = () => {




    return (
        < div>
            <ZitationHeader />
            <Row className="justify-content-center mt-3">
                <Col md={10} lg={10} xl={10}>
                <UpdateCompanyInfoForm />
                </Col>
            </Row>
        </div>
    )
}


export default UpdateCompanyInfo;




