import { ZitationHeader, PageDescription } from "../components/common/Headers/Header"
import CompanySignUpForm from "../components/common/Forms/CompanySignUpForm"
import { UserContext } from "../UserContext";
import React, { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../services/AuthService";

const RegistrarNegocio = () => {

  const { user, setUser } = useContext(UserContext);


  function logOutHandler() {
    logout();
    setUser({ email: "" });
  }

  return (
    <Container>
      <Row className="justify-content-center mx-auto">
        <ZitationHeader className="mx-auto" />
      </Row>
      { user.email !== "" ? (
        <div className="Perfil">
          <h1>Mi cuenta registrada</h1>
          <p>
            <span>{user.email}</span>
            <span>{user.phone}</span>
          </p>
          <Link to="/">
            <button onClick={logOutHandler}>LogOut</button>
          </Link>
        </div>
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
