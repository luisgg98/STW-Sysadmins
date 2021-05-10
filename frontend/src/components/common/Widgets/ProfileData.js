import React, { useContext, useEffect, useState } from "react"
import { Button, Card, Row } from "react-bootstrap"
import { Link, Redirect } from "react-router-dom";
import profile from "../../../assets/profile.png";
import { logOut } from "../../../services/UsersService";
import { UserContext } from "../../../UserContext"
import EditUserInfo from "../Forms/EditUserInfo";


const ProfileData = (props) => {
    const { user, setUser } = useContext(UserContext);
    const [editInfo, setEditInfo] = useState(false);
    const [isCompany, setCompany] = useState(false);
    let str = "";

    useEffect(() => {
        console.log(localStorage.getItem("user"))
        if (localStorage.getItem("user") === "{}") {
            console.log("es company")
            str = "company"
            setCompany(true)
        }
        else if (localStorage.getItem("company") === "{}") {
            console.log("es user")
            str = "user"
            setCompany(false)
        }

        let localUser = JSON.parse(localStorage.getItem(str))
        console.log("local user", localUser)
        if (str === "company")
            setUser({
                name: localUser.name,
                id: localUser.id
            })

        else if (str === "user")
            setUser({
                fname: localUser.first_name,
                lname: localUser.last_name,
                email: localUser.email,
                id: localUser.id,
            })
    }, [])

    return (
        <div>
            <Row className="justify-content-center">
                <Card style={{ width: '18rem' }} border="white" className="text-center ml-5 mt-5">
                    <Card.Img variant="top" src={profile} />
                    <Card.Body >
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Subtitle>{user.email}</Card.Subtitle>
                        <Card.Text>Hola {user.name !== "" ? (user.fname + " " + user.lname) : ("Nombre generado")}, nos alegra verte de nuevo</Card.Text>

                        <Link to="/home">
                            <Row className="justify-content-center mx-auto">
                                <Button type="button" onClick={logOut}>Cerrar sesión</Button>
                            </Row>
                        </Link>
                        {!isCompany &&
                            <Row className="justify-content-center mx-auto pt-1">
                                {!editInfo && <Button type="button" onClick={() => { (setEditInfo(true)) }} >Editar datos</Button>}
                            </Row>
                        }
                        <Row className="pt-2">
                            {editInfo && <EditUserInfo id={user.id} />}
                        </Row>
                        <Row className="justify-content-center mx-auto pt-1">
                            {editInfo && <Button type="button" onClick={() => { (setEditInfo(false)) }} >Cancelar</Button>}
                        </Row>
                        {isCompany &&
                            <Row className="justify-content-center mx-auto pt-1">
                                <Link to="/companies/editInfo"> <Button type="button" >Editar datos de la empresa</Button> </Link>
                            </Row>
                        }
                    </Card.Body>
                </Card>
            </Row>
        </div>
    )
}

export default ProfileData;
