// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//   Link
// } from "react-router-dom";
// import { Button, Card, Col, Container, Row } from 'react-bootstrap';
// import RegistrarNegocioButton from "../Buttons/RegistrarNegocioButton";


// const LoginButton = () => {
//   return (
//     <Link to="/login">
//       <Button>
//         Log In
//       </Button>
//     </Link>
//   )
// }

// const ZitationHeader = () => {
//   return (
//     <Row className="justify-content-center mx-auto">
//       <Link to="/">
//         <div class="display-4"> Zitation </div>
//       </Link>
//     </Row>
//   )
// }

// // const RegistrarNegocioButton = () => {
// //   return (
// //     <Link to="/registrarNegocio">
// //       <Button>
// //         Registrar Negocio
// //       </Button>
// //     </Link>
// //   )
// // }

// const PageDescription = () => {
//   return (
//     <Card bg="Light" className="text-center" border={'white'.toLowerCase()}>
//       <Card.Body >
//         <Card.Text>
//           ¿Tienes un negocio y quieres ofrecer un servicio de cita previa sin complicarte?<br />
//                 ¿Quieres evitar hacer colas y reservar cita previa en los locales que frecuentas?<br />
//                 ¡En ese caso Zitation es tu web!
//       </Card.Text>
//       </Card.Body >
//     </Card>
//   )
// }

// const Header = () => {

//   return (
//     <Card bg="Light" className="text-center" border={'white'.toLowerCase()}>
//       <Card.Header>
//         <Row >
//           <Col xl={8} lg={8} md={8} sm={8} >
//             <Row className="justify-content-center my-auto">
//               <Col>
//                 <div></div>
//               </Col>
//               <Col>
//                 <ZitationHeader />
//               </Col>
//             </Row>
//           </Col>
//           <Col xl={4} lg={4} md={4} sm={4} className="my-auto">
//             <LoginButton />
//           </Col>
//         </Row>

//       </Card.Header>
//       <Card.Body >
//         <Card.Text>
//           ¿Tienes un negocio y quieres ofrecer un servicio de cita previa sin complicarte?<br />
//                 ¿Quieres evitar hacer colas y reservar cita previa en los locales que frecuentas?<br />
//                 ¡En ese caso Zitation es tu web!
//       </Card.Text>
//         <RegistrarNegocioButton />
//       </Card.Body >
//     </Card>
//   );
// }

// export default Header;
// export { Header, ZitationHeader, LoginButton, PageDescription };
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ZitationHeader from "./ZitationHeader";

const LoginButton = () => {
    return (
        <Link to="/login">
            <Button>Log In</Button>
        </Link>
    );
};

const RegistrarNegocioButton = () => {
    return (
        <Link to="/registrarNegocio">
            <Button>Registrar Negocio</Button>
        </Link>
    );
};

const Header = () => {
    return (
        <Card bg="Light" className="text-center" border={"white".toLowerCase()}>
            <Card.Header>
                <Row>
                    <Col xl={8} lg={8} md={8} sm={8}>
                        <Row className="justify-content-center my-auto">
                            <Col>
                                <div></div>
                            </Col>
                            <Col>
                                <ZitationHeader />
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4} className="my-auto">
                        <LoginButton />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    ¿Tienes un negocio y quieres ofrecer un servicio de cita
                    previa sin complicarte?
                    <br />
                    ¿Quieres evitar hacer colas y reservar cita previa en los
                    locales que frecuentas?
                    <br />
                    ¡En ese caso Zitation es tu web!
                </Card.Text>
                <RegistrarNegocioButton />
            </Card.Body>
        </Card>
    );
};

export default Header;
export { Header, ZitationHeader, LoginButton };
