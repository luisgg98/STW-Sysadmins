import {Button, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {getCompanies, removeCompany} from "../../services/CompaniesService";


function CompaniesTable() {

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        getCompanies().then((response) => {
            setCompanies(response.data)
        })
    }, []);


    function handleClick(companyId) {
        removeCompany(companyId).then(r => {
            if (r.status === 204) {
                setCompanies(companies.filter(company => company._id !== companyId))
            }
        }).catch((error) => {
            console.log("Error Borrado compañia", error)
        })
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
                            <Button variant="outline-danger" onClick={() => handleClick(company._id)}>Borrar</Button>
                        </td>
                    </tr>)
                )}
            </tbody>
        </Table>
    )
}

export default CompaniesTable
