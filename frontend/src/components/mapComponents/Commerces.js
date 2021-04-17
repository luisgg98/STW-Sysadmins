import {Marker, Popup} from "react-leaflet";
import React from "react";

function Commerces(props) {

    let marcas = []
    props.commerces.forEach(function (comercio) {
        console.log(comercio)
        let marca = <Marker key={comercio._id} position={comercio.location.coordinates}>
            <Popup key={comercio._id}>{comercio.name}</Popup>
        </Marker>;
        marcas.push(marca);
    });
    return marcas
}

export default Commerces;
