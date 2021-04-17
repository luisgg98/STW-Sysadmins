import {Table} from "react-bootstrap";
import React from "react";

function UsersTable() {

    let users = [
        {
            name: "Alberto",
            email: "760739@unizar.es"
        },
        {
            name: "Hayk",
            email: "hayk@unizar.es"
        },
        {
            name: "Luis",
            email: "luis@unizar.es"
        },
        {
            name: "Germán",
            email: "german@unizar.es"
        },
    ]

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
                        {Object.entries(user).map((pair, index) => (
                            <td key={index}>{pair[1]}</td>
                        ))}
                    </tr>)
                )}
            </tbody>
        </Table>
    )
}

export default UsersTable
