import React, { useContext, useState } from 'react';
import { UserContext } from "../UserContext";
import { logout } from "../services/AuthService";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { ZitationHeader } from "../components/common/Headers/Header";
import profile from "../assets/profile.png";

function AccountPage() {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    let reservas = [
        {
            fecha: new Date(2021, 1, 24, 10, 33, 30),
            servicio: "corte de pelo",
            lugar: "Calle la aventura",
            empresa: "Peluquería maria juana"
        },
        {
            fecha: new Date(2021, 1, 25, 10, 33, 30),
            servicio: "Uñas",
            lugar: "Calle la belleza",
            empresa: "Esteetica juani"
        },
        {
            fecha: new Date(2021, 1, 26, 10, 33, 30),
            servicio: "Cita en delegación del gobierno",
            lugar: "Calle pedro",
            empresa: "Delegación del gobierno"
        },
        {
            fecha: new Date(2021, 1, 27, 10, 33, 30),
            servicio: "Padel",
            lugar: "Calle deporte",
            empresa: "Centro deportivo pepe"
        },
        {
            fecha: new Date(2021, 1, 28, 10, 33, 30),
            servicio: "Abogado",
            lugar: "Calle la justicia",
            empresa: "Ministerio de justicia"
        },
        {
            fecha: new Date(2021, 1, 26, 10, 33, 30),
            servicio: "Cita en delegación del gobierno",
            lugar: "Calle pedro",
            empresa: "Delegación del gobierno"
        },
        {
            fecha: new Date(2021, 1, 27, 10, 33, 30),
            servicio: "Padel",
            lugar: "Calle deporte",
            empresa: "Centro deportivo pepe"
        },
        {
            fecha: new Date(2021, 1, 28, 10, 33, 30),
            servicio: "Abogado",
            lugar: "Calle la justicia",
            empresa: "Ministerio de justicia"
        }
    ];


    function logOutHandler() {
        logout();
        setUser({ email: "" });
    }

    const ProfileData = () => {
        return (
            <div>
                <Card style={{ width: '18rem' }} border="white" className="text-center ml-5 mt-5">
                    <Card.Img variant="top" src={profile} />
                    <Card.Body >
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Subtitle>{user.email}</Card.Subtitle>
                        <Card.Text>Hola {user.name !== "" ? (user.name) : ("Nombre generado")}, nos alegra verte de nuevo</Card.Text>
                        <Link to="/home">
                            <Row className="justify-content-center mx-auto">
                                <Button type="button" onClick={logOutHandler}>Cerrar sesión</Button>
                            </Row>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        )
    }


    const CardReserva = (props) => {
        const fecha = props.reserva.fecha
        if (!loading) {
            return (
                <div>
                    <Card style={{ width: '18rem' }} border="white" className="ml-5 mt-5">
                        <Row className="align-items-center">
                            <Col xs={3} sm={3} md={3} lg={3}> <Card.Img variant="top" src={profile} /> </Col>
                            <Col xs={9} sm={9} md={9} lg={9}><Card.Body >
                                <Row> <Card.Title>{props.reserva.servicio}</Card.Title> </Row>
                                <Row> <Card.Subtitle>{props.reserva.lugar}</Card.Subtitle> </Row>
                                <Row> <Card.Subtitle>{props.reserva.empresa}</Card.Subtitle> </Row>
                                <Row> <Card.Text>{fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate() + fecha.getHours() + ":" + fecha.getMinutes()} </Card.Text> </Row>
                            </Card.Body></Col>
                        </Row>
                    </Card>
                </div>
            )
        }
        else return <div>Pene</div>;
    }

    const Reservas = () => {
        if (!loading) {
            return (
                reservas.map((res) =>
                    <CardReserva reserva={res} />
                )
            )
        }
    }

    return (
        <div>
            {user.email !== "" ? (
                <div>
                    <ZitationHeader />
                    <Row fluid="md">
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <ProfileData />
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <Reservas className="justify-content-center mx-auto" />
                        </Col>
                    </Row>
                    {/* <ul>
                    <li>Nombre: {user.name}</li>
                    <li>Email: {user.email}</li>
                </ul> */}
                </div>


            ) : (
                <Redirect to="/login" />
            )}


        </div>
    );
}

export default AccountPage;
