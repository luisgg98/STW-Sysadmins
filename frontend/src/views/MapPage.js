import React, {useEffect, useState} from "react";
import CovidMap from "../components/mapComponents/CovidMap"
import ZitationHeader from "./../components/common/Headers/ZitationHeader"
import {fetchHealthZones} from "../services/CovidStatisticsService";
import {fetchCommerces} from "../services/CommerceService";

const MapPage = () => {

    const [healthZones, setHealthZones] = useState([]);
    const [commerces, setCommerces] = useState([]);

    useEffect(function () {
            const getHealthZones = async () => {
                const result = await fetchHealthZones();
                setHealthZones(result.data);
            }
            getHealthZones()
                .catch((error) => console.log(error));

            const getCommerces = async () => {
                const result = await fetchCommerces();
                setCommerces(result.data);
            }
            getCommerces()
                .catch((error) => console.log(error));

        },
        [])

    return (
        <div>
            <ZitationHeader/>
            <h1>Incidencia Covid-19 en Zaragoza</h1>
            <CovidMap healthZones={healthZones} commerces={commerces}/>
        </div>
    );
};

export default MapPage;
