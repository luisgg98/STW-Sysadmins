import {useContext} from "react";
import LoginForm from "../components/common/Forms/LoginForm";
import {UserContext} from "../UserContext";
import {Container, Row} from "react-bootstrap";
import {PageDescription} from "../components/common/Headers/Header"
import {Redirect} from "react-router-dom"
import ZitationHeader from "../components/common/Headers/ZitationHeader";


const LoginPage = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <Container>
            <Row className="justify-content-center mx-auto">
                <ZitationHeader className="mx-auto" />
            </Row>
            { localStorage.getItem("logged")==="true" ? (
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
