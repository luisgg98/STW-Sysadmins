import React from "react";
import CovidMap from "../components/mapComponents/CovidMap"
import ZitationHeader from "./../components/common/Headers/ZitationHeader"

const MapPage = () => {
    return (
        <div>
            <ZitationHeader/>
            <h1>Incidencia Covid-19 en Zaragoza</h1>
            <CovidMap/>
        </div>
    );
};

export default MapPage;
