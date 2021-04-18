import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardGroup } from 'react-bootstrap';
import salud from "../../../assets/salud.jpeg";
import comercio from "../../../assets/comercio.jpeg";
import deporte from "../../../assets/deporte.jpeg";
import ocio from "../../../assets/ocio.jpeg";
import admin from "../../../assets/admin.png";
import { Link } from 'react-router-dom';

const CategoryCards = () => {
  // require( salud, comercio, deporte, ocio, admin);
  return (
    <CardGroup>
      <Card>
        <Card.Img variant="top" src={salud} />
        <Card.Body>
          <Link to="/companies/health">
            <Card.Title >Salud y Belleza</Card.Title>
          </Link>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in to
            additional content. This content is a little bit longer.
      </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src={deporte} />
        <Card.Body>
          <Card.Title>Deporte</Card.Title>
          <Card.Text>
            This cardd has supporting text below as a natural lead-in to additional
        content.{' '}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src={ocio} />
        <Card.Body>
          <Card.Title>Ocio</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in to
            additional content. This card has even longer content than the first to
            show that equal height action.
      </Card.Text>
        </Card.Body>

      </Card>

      <Card>
        <Card.Img variant="top" src={admin} />
        <Card.Body>
          <Card.Title>Administración Pública</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to additional
        content.{' '}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Img variant="top" src={comercio} />
        <Card.Body>
        <Link to="/companies/comercio">
          <Card.Title>Comercio</Card.Title>
          </Link>
          <Card.Text>
            This card has supporting text below as a natural lead-in to additional
        content.{' '}
          </Card.Text>
        </Card.Body>
      </Card>

    </CardGroup>
  );
}

export default CategoryCards;