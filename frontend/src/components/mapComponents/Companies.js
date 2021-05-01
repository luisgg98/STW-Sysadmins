import {Marker, Popup} from "react-leaflet";
import React, {useEffect, useState} from "react";
import {getCompanies} from "../../services/CompaniesService";

function Companies(props) {

    const [companies, setCompanies] = props.companiesState;
    const [filters, _] = props.filtersState

    useEffect(() => {
        getCompanies().then((response) => {
            setCompanies(response.data)
        })
    }, []);

    let marcas = []
    companies.forEach((comercio) => {
        if (!(filters.blackListCategories.includes(comercio.category))) {
            let marca = <Marker key={comercio._id} position={comercio.location.coordinates}>
                <Popup key={comercio._id}>{comercio.name}</Popup>
            </Marker>;
            marcas.push(marca);
        }

    });
    return marcas
}

export default Companies;
