import { useContext } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/common/Forms/LoginForm";
import { UserContext } from "../UserContext";
import { logout } from "../services/AuthService";
import { Container, Row, Col } from "react-bootstrap";
import { PageDescription, ZitationHeader } from "../components/common/Headers/Header"

const LoginPage = () => {
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
            {user.email !== "" ? (
                <div className="Perfil">
                    <h1>Mi cuenta</h1>
                    <p>
                        <span>{user.email}</span>
                    </p>
                    <Link to="/login">
                        <button onClick={logOutHandler}>Log Out</button>
                    </Link>
                </div>
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
