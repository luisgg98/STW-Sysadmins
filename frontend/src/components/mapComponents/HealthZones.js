import {Circle, Popup} from "react-leaflet";
import React, {useEffect, useState} from "react";
import {getHealthZones} from "../../services/HealthZonesService";

function selectColor(newCases) {
    let color;
    if (newCases === 0) color = '#ffffff';
    else if (0 < newCases && newCases <= 5) color = '#77ff77';
    else if (5 < newCases && newCases <= 10) color = '#f3ff00';
    else if (10 < newCases && newCases <= 15) color = '#ff9000';
    else color = '#ff0700'
    return color
}

function HealthZones(props) {

    const [healthZones, setHealthZones] = props.healthZonesState;
    const [filters, _] = props.filtersState

    useEffect(() => {
        getHealthZones().then((response) => {
            setHealthZones(response.data)
        })
    }, []);

    let zonas = []
    healthZones.forEach(function (healthZone) {
        if (
            !(filters.blackListHealthZones.includes(healthZone.name)) &&
            healthZone.newcases >= filters.minCases
        ) {
            const zona =
                <Circle key={healthZone.name} center={healthZone.location.coordinates}
                        radius={healthZone.radius + 400}
                        color={selectColor(healthZone.newcases)}>
                    <Popup key={healthZone.name}>{healthZone.name}: {healthZone.newcases}</Popup>
                </Circle>
            zonas.push(zona);
        } else {
            console.log("Este no lo renderizo" + healthZone.name)
        }
    });
    return zonas;
}

export default HealthZones;
