import {Circle, Popup} from "react-leaflet";
import React, {useEffect, useState} from "react";
import {getHealthZones} from "../../services/HealthZones";

function selectColor(newCases) {
    let color;
    if (newCases === 0) color = '#ffffff';
    else if (0 < newCases && newCases <= 5) color = '#77ff77';
    else if (5 < newCases && newCases <= 10) color = '#f3ff00';
    else if (10 < newCases && newCases <= 15) color = '#ff9000';
    else color = '#ff0700'
    return color
}

function HealthZones() {

    const [healthZones, setHealthZones] = useState([]);

    useEffect(() => {
        getHealthZones().then((response) => {
            setHealthZones(response.data)
        })
    }, []);

    let zonas = []
    healthZones.forEach(function (healthZone, index) {

        let zona = <Circle center={healthZone.location.coordinates} radius={healthZone.radius + 400}
                           color={selectColor(healthZone.newcases)}>
            <Popup>{healthZone.name}: {healthZone.newcases}</Popup>
        </Circle>
        zonas.push(zona);
    });
    return zonas;
}

export default HealthZones;
