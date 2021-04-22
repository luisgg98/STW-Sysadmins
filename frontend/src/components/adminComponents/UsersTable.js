import {Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {getUsers} from "../../services/UsersService";

function UsersTable() {

    const [users, setUsers] = useState([]);

    // let users = [
    //     {
    //         name: "Alberto",
    //         email: "760739@unizar.es"
    //     },
    //     {
    //         name: "Hayk",
    //         email: "hayk@unizar.es"
    //     },
    //     {
    //         name: "Luis",
    //         email: "luis@unizar.es"
    //     },
    //     {
    //         name: "Germán",
    //         email: "german@unizar.es"
    //     },
    // ]

    useEffect(() => {
        getUsers().then((response) => {
            setUsers(response.data)
        })
    }, []);


    return (

        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                    </tr>)
                )}
            </tbody>
        </Table>
    )
}

export default UsersTable
