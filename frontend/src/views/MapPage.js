import React, {useEffect, useState} from "react";
import CovidMap from "../components/mapComponents/CovidMap"
import ZitationHeader from "./../components/common/Headers/ZitationHeader"
import {fetchHealthZones} from "../services/CovidStatisticsService";

const MapPage = () => {

    const [healthZones, setHealthZones] = useState([]);

    useEffect(function () {
            const fetchData = async () => {
                const result = await fetchHealthZones();
                setHealthZones(result.data);
            }
            fetchData()
                .catch((error) => console.log(error));

        },
        [])

    return (
        <div>
            <ZitationHeader/>
            <h1>Incidencia Covid-19 en Zaragoza</h1>
            <CovidMap healthZones={healthZones} />
        </div>
    );
};

export default MapPage;
