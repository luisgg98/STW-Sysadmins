import CompanySignUpForm from "../components/common/Forms/CompanySignUpForm"
import {UserContext} from "../UserContext";
import React, {useContext} from "react";
import {Container, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import api from "../services/APICall";
import ZitationHeader from "../components/common/Headers/ZitationHeader";
import {logOut} from "../services/UsersService";
import PageDescription from "../components/common/Widgets/PageDescription";
import Header from "../components/common/Headers/Header";

const RegistrarNegocio = () => {

    const {user, setUser} = useContext(UserContext);


    return (
        <div>
            <Header/>
            <Container>
                {localStorage.getItem("logged") === "true" ? (
                    <Redirect to="/cuenta"/>
                ) : (
                    <div>
                        <Row className="justify-content-center">
                            <PageDescription/>
                        </Row>
                        <Row className="justify-content-center">
                            <CompanySignUpForm/>
                        </Row>
                    </div>

                )
                }
            </Container>
        </div>

    );
};

export default RegistrarNegocio;
