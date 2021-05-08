import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegistrarNegocio from "./views/CompanyRegistrationPage";
import UserRegistrationPage from "./views/UserRegistrationPage";
import MapPage from "./views/MapPage"
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { Container } from 'react-bootstrap'
import AdminPage from "./views/AdminPage";
import AccountPage from "./views/AccountPage";
import CompanyPage from "./views/CompanyPage";
import ServiceCreation from "./views/ServiceCreation";
import AddService from "./views/AddService";
import UpdateCompanyInfo from "./views/UpdateCompanyInfo";
import CompanyDetailsPage from "./views/CompanyDetailsPage";
import ServiceDetailsPage from "./views/ServiceDetailsPage";



export default function App() {
    const [user, setUser] = useState({ name: "", email: "" });
    const history = useHistory();

    require('dotenv').config()

    const ProtectedRouteCompany = ({
        component: Component,
        isCompany: isCompany,
        ...rest
    }) => {
        return (
            <Route
                {...rest}
                render={(props) => (
                    (localStorage.getItem("logged")==="true" && localStorage.getItem("user")==="{}")
                    ? <Component {...props}/>
                    : <Redirect to="/login" />
                )} 
            />
        )
    }

    const ProtectedRouteUser = ({
        component: Component,
        isCompany: isCompany,
        ...rest
    }) => {
        return (
            <Route
                {...rest}
                render={(props) => (
                    (localStorage.getItem("logged")==="true" && localStorage.getItem("company")==="{}")
                    ? <Component {...props}/>
                    : <Redirect to="/login" />
                )} 
            />
        )
    }


    return (
        console.log(process.env.REACT_APP_RECAPTCHA_API_KEY),
        <Router history={history} >
            <Container fluid="true" className="App">
                <UserContext.Provider value={{ user, setUser }}>
                    <Switch>
                        <ProtectedRouteCompany path="/companies/editInfo" component={UpdateCompanyInfo}  isCompany={true} />

                        <ProtectedRouteCompany path="/services/add" component={AddService}  isCompany={true} />
                        
                        <ProtectedRouteCompany path="/services" component={ServiceCreation}  isCompany={true} />



                        <Route path="/companies/health">
                            <CompanyPage tipo="Salud y Belleza" search={[]} />
                        </Route>

                        <Route path="/companies/comercio">
                            <CompanyPage tipo="Comercio" search={[]} />
                        </Route>

                        <Route path="/companies/ocio">
                            <CompanyPage tipo="Ocio" search={[]} />
                        </Route>

                        <Route path="/companies/adminPublica">
                            <CompanyPage tipo="Administración pública" search={[]} />
                        </Route>

                        <Route path="/companies/deporte">
                            <CompanyPage tipo="Deporte" search={[]} />
                        </Route>
                        
                        <Route path="/company/:nif/services/:id">
                            <ServiceDetailsPage />
                        </Route>

                        <Route path="/company/:nif">
                            <CompanyDetailsPage />
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
