import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegistrarNegocio from "./views/RegistrarNegocio";
import RegisterPage from "./views/RegisterPage";
import MapPage from "./views/MapPage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext";
import RegisterPage from "./views/RegisterPage";
import {Container} from 'react-bootstrap'

export default function App() {
    const [user, setUser] = useState({ name: "", email: "" });

    return (
        <Router>
            <Container fluid="true" className="App">
                <UserContext.Provider value={{ user, setUser }}>
                    <Switch>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/registro">
                            <RegisterPage />
                        </Route>
                        <Route path="/registrarNegocio">
                            <RegistrarNegocio />
                        </Route>
                        <Route path="/mapa">
                            <MapPage />
                        </Route>
                        <Route path="/">
                            <HomePage />
                        </Route>
                    </Switch>
                </UserContext.Provider>
            </Container>
        </Router>
    );
}
