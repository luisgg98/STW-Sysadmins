import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegistrarNegocio from "./views/RegistrarNegocio";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext";
import RegisterPage from "./views/RegisterPage";
import { Container } from 'react-bootstrap'

const express = require('express')
const path = require('path');

const app = express()
const port = process.env.PORT || 3000 // Heroku will need the PORT environment variable

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => console.log(`App is live on port ${port}!`))



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
                        <Route path="https://zitation.herokuapp.com/">
                            <HomePage />
                        </Route>
                    </Switch>
                </UserContext.Provider>
            </Container>
        </Router>
    );
}
