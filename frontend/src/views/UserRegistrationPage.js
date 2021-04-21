import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PageDescription, ZitationHeader } from "../components/common/Headers/Header"
import UserSUForm from "../components/common/Forms/UserSignUpForm"
import { UserContext } from "../UserContext";
import api from "../services/APICall";
import { Container, Row } from "react-bootstrap";

const UserRegistrationPage = () => {

    const { user, setUser } = useContext(UserContext);

    function logOutHandler() {
        api.logout();
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
                        <UserSUForm />
                    </Row>
                </div>

            )
            }
        </Container >
    )
};

export default UserRegistrationPage;
