import React from "react";
import L from "leaflet";
import {MapContainer, TileLayer,} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ****** This code fixes css problems with leaflet ******
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Companies from "./Companies";
import HealthZones from "./HealthZones";
import {Container} from "react-bootstrap";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
// ****** End of fixing code ******


const CovidMap = () => {
    const coordenadasZgz = [41.65, -0.87];

    return (
        <Container fluid>
            <MapContainer
                center={coordenadasZgz}
                zoom={14}
                scrollWheelZoom={false}
                style={{width: "100%", height: "80vh"}}

            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Companies/>
                <HealthZones/>
            </MapContainer>
        </Container>
    );
};

export default CovidMap;
