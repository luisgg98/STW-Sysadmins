import React, {useContext} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import {Button, Card, Col, Row} from "react-bootstrap";
import ZitationHeader from "./ZitationHeader";
import {UserContext} from "../../../UserContext";

const LoginButton = () => {
    const {user,} = useContext(UserContext);

    if ( localStorage.getItem("logged") === "true") {
        return (
            <Link to="/cuenta">
                <Button>Mi cuenta</Button>
            </Link>
        );
    } else {
        return (
            <Link to="/login">
                <Button>Iniciar sesión</Button>
            </Link>
        );
    }
};


const RegistrarNegocioButton = () => {
    return (
        <Link to="/registrarNegocio">
            <Button>Registrar Negocio</Button>
        </Link>
    );
};



const Header = () => {
    return (
        <Card bg="Light" className="text-center" border={"white".toLowerCase()}>
            <Card.Header>
                <Row>
                    <Col xl={8} lg={8} md={8} sm={8}>
                        <Row className="justify-content-center my-auto">
                            <Col>
                                <div></div>
                            </Col>
                            <Col>
                                <ZitationHeader/>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4} className="my-auto">
                        <LoginButton/>
                    </Col>
                </Row>
            </Card.Header>
            <div className="pb-3"/>
        </Card>
    );
};

export default Header;
export {Header, LoginButton};
