import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const CategoryCards = () => (
    <div class="card-deck">
        <div class="card">
            <img class="card-img-top" src="../../../assets/salug.jpeg" alt="Card cap" />
            <div class="card-body">
                <h5 class="card-title">Salud y Belleza</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        <div class="card">
            <img class="card-img-top" src="../../../assets/deporte.jpeg" alt="Card cap" />
            <div class="card-body">
                <h5 class="card-title">Deporte</h5>
                <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            </div>
        </div>
        <div class="card">
            <img class="card-img-top" src="../../../assets/ocio.jpeg" alt="Card cap" />
            <div class="card-body">
                <h5 class="card-title">Ocio</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            </div>
        </div>
        <div class="card">
            <img class="card-img-top" src="../../../assets/admin.png" alt="Card cap" />
            <div class="card-body">
                <h5 class="card-title">Administracion Pública</h5>
                <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            </div>
        </div>
        <div class="card">
            <img class="card-img-top" src="../../../assets/comercio.jpeg" alt="Card cap" />
            <div class="card-body">
                <h5 class="card-title">Comercio</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            </div>
        </div>
    </div>
);

export default CategoryCards;