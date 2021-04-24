import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ZitationHeader = () => {
    return (
        <Row className="justify-content-center mx-auto">
                <Link to="/">
                    <div className="display-4"> Zitation </div>
                </Link>
        </Row>
    );
};


export default ZitationHeader;
