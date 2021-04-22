import {Button, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {getCompanies} from "../../services/CompaniesService";

function CompaniesTable() {

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        getCompanies().then((response) => {
            setCompanies(response.data)
        })
    }, []);


    function handleClick() {
        //TODO implementar borrado
        console.log("Cuando este implementado borrare la compañia")
    }

    return (
        <Table responsive striped bordered hover>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Categoría</th>
                <th>Localización</th>
                <th>Opciones</th>
            </tr>
            </thead>
            <tbody>
            {
                companies.map((company, index) => (
                    <tr key={index}>
                        <td>{company.name}</td>
                        <td>{company.email}</td>
                        <td>{company.category}</td>
                        <td>{company.location.coordinates}</td>
                        <td>
                            <Button variant="outline-danger" onClick={handleClick}>Borrar</Button>
                        </td>
                    </tr>)
                )}
            </tbody>
        </Table>
    )
}

export default CompaniesTable
