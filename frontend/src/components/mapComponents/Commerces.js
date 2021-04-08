import {fetchCommerces} from "../../services/CommerceService";
import {Marker, Popup} from "react-leaflet";
import React from "react";

function Commerces() {
    /**
     * Devuelve un array de <Marker> los comercios
     * */
    const comercios = fetchCommerces();
    let marcas = []
    comercios.forEach(function (comercio) {
        let marca = <Marker position={comercio.location}>
            <Popup>{comercio.name}</Popup>
        </Marker>;
        marcas.push(marca);
    });
    return marcas
}

export default Commerces;
