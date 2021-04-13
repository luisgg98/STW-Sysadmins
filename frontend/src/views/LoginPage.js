import { useContext } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/common/Forms/LoginForm";
import { UserContext } from "../UserContext";
import { logout } from "../services/AuthService";
import { Container, Row } from "react-bootstrap";
import { PageDescription, ZitationHeader } from "../components/common/Headers/Header"
import {Redirect} from "react-router-dom"


const LoginPage = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <Container>
            <Row className="justify-content-center mx-auto">
                <ZitationHeader className="mx-auto" />
            </Row>
            {user.email !== "" ? (
                <Redirect to="/cuenta" />
            ) : (
                <div>
                    <Row className="justify-content-center">
                        <PageDescription />
                    </Row>
                    <Row className="justify-content-center">
                        <LoginForm />
                    </Row>
                </div>
            )}
        </Container>
    );
};

export default LoginPage;
