import {fetchCommerces} from "../../services/CommerceService";
import {Marker, Popup} from "react-leaflet";
import React from "react";

function Commerces() {

    const comercios = fetchCommerces();
    let marcas = []
    comercios.forEach(function (comercio) {
        let marca = <Marker key={comercio._id} position={comercio.location}>
            <Popup key={comercio._id}>{comercio.name}</Popup>
        </Marker>;
        marcas.push(marca);
    });
    return marcas
}

export default Commerces;
