import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegistrarNegocio from "./views/CompanyRegistrationPage";
import UserRegistrationPage from "./views/UserRegistrationPage";
import MapPage from "./views/MapPage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { Container } from 'react-bootstrap'
import AdminPage from "./views/AdminPage";
import AccountPage from "./views/AccountPage";
import HealthPage from "./views/HealthPage";



export default function App() {
    const [user, setUser] = useState({ name: "", email: "" });


    return (
        <Router>
            <Container fluid="true" className="App">
                <UserContext.Provider value={{ user, setUser }}>
                    <Switch>
                        <Route path="/companies/health">
                            <HealthPage />
                        </Route>

                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/registro">
                            <UserRegistrationPage />
                        </Route>
                        <Route path="/registrarNegocio">
                            <RegistrarNegocio />
                        </Route>
                        <Route path="/mapa">
                            <MapPage />
                        </Route>
                        <Route path="/admin">
                            <AdminPage />
                        </Route>
                        <Route path="/cuenta">
                            <AccountPage />
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


// function PrivateRoute({ component: Component, ...rest }) {
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           fakeAuth.isAuthenticated ? (
//             <Component {...props} />
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: props.location }
//               }}
//             />
//           )
//         }
//       />
//     );
//   }