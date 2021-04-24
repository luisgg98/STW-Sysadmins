import { PageDescription } from "../components/common/Headers/Header"
import CompanySignUpForm from "../components/common/Forms/CompanySignUpForm"
import { UserContext } from "../UserContext";
import React, { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import api from "../services/APICall";
import ZitationHeader from "../components/common/Headers/ZitationHeader";
import { logOut } from "../services/UsersService";

const RegistrarNegocio = () => {

  const { user, setUser } = useContext(UserContext);


  return (
    <Container>
      <Row className="justify-content-center mx-auto">
        <ZitationHeader className="mx-auto" />
      </Row>
      { localStorage.getItem("logged")==="true" ? (
        <Redirect to="/cuenta"></Redirect>
      ) : (
        <div >
          <Row className="justify-content-center">
            <PageDescription />
          </Row>
          <Row className="justify-content-center">
            <CompanySignUpForm />
          </Row>
        </div>

      )
      }
    </Container >
  );
};

export default RegistrarNegocio;
