import React, { useContext, useEffect, useState } from "react"
import { Card, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import profile from "../../../assets/profile.png";
import { UserContext } from "../../../UserContext"
import api from "../../../services/AuthService"
import EditUserInfo from "../Forms/EditUserInfo";



const ProfileData = (props) => {
    const { user, setUser } = useContext(UserContext);
    const [editInfo, setEditInfo] = useState(false);

    function logOutHandler() {

        localStorage.setItem("user", JSON.stringify({}));
        localStorage.setItem("token", "");
        localStorage.setItem("logged", false);
        setUser({ email: "" });
        api.logout();
    }

    useEffect(() => {
        let localUser = JSON.parse(localStorage.getItem("user"))
        console.log("local user", localUser)
        console.log("username", localUser.name)
        setUser({
            fname: localUser.first_name,
            lname: localUser.last_name,
            email: localUser.email,
            id: localUser.id,
        })
    }, [])

    return (
        <div>
            <Row>
                <Card style={{ width: '18rem' }} border="white" className="text-center ml-5 mt-5">
                    <Card.Img variant="top" src={profile} />
                    <Card.Body >
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Subtitle>{user.email}</Card.Subtitle>
                        <Card.Text>Hola {user.name !== "" ? (user.fname + " " + user.lname) : ("Nombre generado")}, nos alegra verte de nuevo</Card.Text>
                        <Link to="/home">
                            <Row className="justify-content-center mx-auto">
                                <Button type="button" onClick={logOutHandler}>Cerrar sesión</Button>
                            </Row>
                        </Link>
                        <Row className="justify-content-center mx-auto pt-1">
                            {!editInfo && <Button type="button" onClick={() => { (setEditInfo(true)) }} >Editar datos</Button>}
                        </Row>
                        <Row className="pt-2">
                            {editInfo && <EditUserInfo id={user.id} />}
                        </Row>
                        <Row className="justify-content-center mx-auto pt-1">
                            {editInfo && <Button type="button" onClick={() => { (setEditInfo(false)) }} >Cancelar</Button>}
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
        </div>
    )
}

export default ProfileData;