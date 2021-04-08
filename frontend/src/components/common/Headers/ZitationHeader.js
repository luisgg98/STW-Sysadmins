import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ZitationHeader = () => {
    return (
        <Row className="justify-content-center mx-auto">
            <Link to="/">
                <div class="display-4"> Zitation </div>
            </Link>
        </Row>
    );
};


export default ZitationHeader;
