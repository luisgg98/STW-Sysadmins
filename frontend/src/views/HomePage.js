import React, { useState } from "react";
import Header from "../components/common/Headers/Header";
import SearchBar from "../components/common/Bars/SearchBar";
import CategoryCards from "../components/common/Buttons/CategoryCards";
import MapButton from "../components/common/Buttons/MapButton"
import api from "../services/AuthService"
import { Row } from "react-bootstrap";
import CompanyCard from "../components/common/Buttons/CompanyCards";

const HomePage = () => {

    const [results, setResults] = useState([]);

    const buscar = async (texto, e) => {
        console.log("e", e)
        console.log("buscar ", texto)
        if (texto ) {
            await api.axios.get('companies/',
                {
                    params:
                        { name: texto }
                }
            ).then(response => {
                setResults(response.data)
                console.log(response.data)
                console.log(response.status)
            })
        }
        else setResults([])
    }

    const Contenido = () => {
        if (results.length !== 0) {
            return (results.map((company, index) => {
                return <CompanyCard key={index} title={company.name} />
            }
            ))
        }
    }

    return (
        <div>
            <Header />
            <SearchBar onSearch={buscar} />
            {console.log(results.busqueda)}
            { results.length === 0 ? <CategoryCards /> : <Contenido />}
            { results.length === 0 ? <MapButton /> : <Row> </Row>}
        </div>
    );
};

export default HomePage;
