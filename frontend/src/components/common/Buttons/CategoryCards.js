import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardGroup } from 'react-bootstrap';
import salud from "../../../assets/salud.jpeg";
import comercio from  "../../../assets/comercio.jpeg";
import deporte from "../../../assets/deporte.jpeg";
import ocio from "../../../assets/ocio.jpeg";
import admin from "../../../assets/admin.png";

const CategoryCards = () => {
    // require( salud, comercio, deporte, ocio, admin);
    return (
    <CardGroup>
  <Card>
    <Card.Img variant="top" src={salud} />
    <Card.Body>
      <Card.Title>Salud y Belleza</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src={deporte}/>
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
      <Card.Title>Comercio</Card.Title>
      <Card.Text>
        This card has supporting text below as a natural lead-in to additional
        content.{' '}
      </Card.Text>
    </Card.Body>
  </Card>

  </CardGroup>

    // <div class="card-deck">
    //     <div class="card">
    //         <img class="card-img-top" src="../../../assets/salug.jpeg" alt="Card cap" />
    //         <div class="card-body">
    //             <h5 class="card-title">Salud y Belleza</h5>
    //             <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    //         </div>
    //     </div>
    //     <div class="card">
    //         <img class="card-img-top" src="../../../assets/deporte.jpeg" alt="Card cap" />
    //         <div class="card-body">
    //             <h5 class="card-title">Deporte</h5>
    //             <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
    //         </div>
    //     </div>
    //     <div class="card">
    //         <img class="card-img-top" src="../../../assets/ocio.jpeg" alt="Card cap" />
    //         <div class="card-body">
    //             <h5 class="card-title">Ocio</h5>
    //             <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
    //         </div>
    //     </div>
    //     <div class="card">
    //         <img class="card-img-top" src="../../../assets/admin.png" alt="Card cap" />
    //         <div class="card-body">
    //             <h5 class="card-title">Administracion Pública</h5>
    //             <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
    //         </div>
    //     </div>
    //     <div class="card">
    //         <img class="card-img-top" src="../../../assets/comercio.jpeg" alt="Card cap" />
    //         <div class="card-body">
    //             <h5 class="card-title">Comercio</h5>
    //             <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
    //         </div>
    //     </div>
    // </div>
);
    }

export default CategoryCards;