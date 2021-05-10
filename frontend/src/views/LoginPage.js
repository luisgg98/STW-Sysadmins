import {useContext} from "react";
import LoginForm from "../components/common/Forms/LoginForm";
import {UserContext} from "../UserContext";
import {Container, Row} from "react-bootstrap";
import {Redirect} from "react-router-dom"
import ZitationHeader from "../components/common/Headers/ZitationHeader";
import PageDescription from "../components/common/Widgets/PageDescription";
import Header from "../components/common/Headers/Header";


const LoginPage = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <div>
            <Header/>
            <Container>
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
        </div>

    );
};

export default LoginPage;
