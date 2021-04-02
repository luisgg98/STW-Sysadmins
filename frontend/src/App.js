import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegistrarNegocio from "./views/RegistrarNegocio";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext";
import RegisterPage from "./views/RegisterPage";

export default function App() {
    const [user, setUser] = useState({ name: "", email: "" });

    return (
        <Router>
            <div className="App">
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
                        <Route path="/">
                            <HomePage />
                        </Route>
                    </Switch>
                </UserContext.Provider>
            </div>
        </Router>
    );
}
