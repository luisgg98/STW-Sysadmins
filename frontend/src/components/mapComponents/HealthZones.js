import {fetchHealthZones} from "../../services/CovidStatisticsService";
import {Circle, Popup} from "react-leaflet";
import React from "react";

function HealthZones() {
    const healthZones = fetchHealthZones();
    let zonas = []
    healthZones.forEach(function (healthZone) {
        let coordenadas = [healthZone.location.lat, healthZone.location.lnt]
        let zona = <Circle center={coordenadas} radius={healthZone.radio}>
            <Popup>{healthZone.name}: {healthZone.cases}</Popup>
        </Circle>
        zonas.push(zona)
    });
    return zonas;
}

export default HealthZones;
