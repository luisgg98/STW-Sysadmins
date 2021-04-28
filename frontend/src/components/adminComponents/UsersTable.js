import {Button, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {getUsers, removeUser} from "../../services/UsersService";

function UsersTable() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((response) => {
            setUsers(response.data)
        })
    }, []);


    function handleClick(user_id) {
        removeUser(user_id).then(r => {
            if (r.status === 204) {
                setUsers(users.filter(user => user._id !== user_id))
            }
        }).catch((error) => {
            console.log("Error Borrado usuario", error)
        })
    }

    return (

        <Table responsive striped bordered hover>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Opciones</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>
                            <Button variant="outline-danger" onClick={() => handleClick(user._id)}>Borrar</Button>
                        </td>
                    </tr>)
                )}
            </tbody>
        </Table>
    )
}

export default UsersTable
