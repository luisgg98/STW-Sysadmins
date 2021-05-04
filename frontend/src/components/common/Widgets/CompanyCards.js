import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CompanyCard(props) {
    const {company} = props;
    const nif = company.nif;
    console.log("company card", nif)
    return (
        <CardGroup >
            <Card>
                <Card.Body>
                    <Link to={'/company/'+nif}>
                        <Card.Title>{(company.name).toUpperCase()}</Card.Title>
                    </Link>
                    <Card.Text>{company.description==="null" ? ("No dispone de descripción").toUpperCase() : (company.description).toUpperCase()} </Card.Text>
                </Card.Body>
            </Card>
        </CardGroup>
    );
}

export default CompanyCard;
