import React from "react";
import L from "leaflet";
import {
    MapContainer,
    TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ****** This code fixes css problems with leaflet ******
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Commerces from "./Commerces";
import HealthZones from "./HealthZones";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
// ****** End of fixing code ******

const coordenadasZgz = [41.65, -0.87];

const CovidMap = (props) => {
    return (
        <div>
            <MapContainer
                center={coordenadasZgz}
                zoom={14}
                scrollWheelZoom={false}
                style={{width: "100%", height: "900px"}}

            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Commerces commerces={props.commerces}/>
                <HealthZones healthZones={props.healthZones} />
            </MapContainer>
        </div>
    );
};

export default CovidMap;
