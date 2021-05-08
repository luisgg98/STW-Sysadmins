import React, {useState} from "react";
import Header from "../components/common/Headers/Header";
import SearchBar from "../components/common/Bars/SearchBar";
import CategoryCards from "../components/common/Widgets/CategoryCards";
import MapButton from "../components/common/Widgets/MapButton"
import {Row} from "react-bootstrap";
import CompanyCard from "../components/common/Widgets/CompanyCards";
import {searchCompanies} from "../services/CompaniesService"

const HomePage = () => {

    const [results, setResults] = useState([]);

    const buscar = async (texto, e) => {
        console.log("buscar ", texto)
        try {
            const result = await searchCompanies(texto)
            setResults(result)
            console.log("result buscar", result)
        } catch (error){
            console.log(error)
        }
    }



    const Contenido = () => {
        if (results.length !== 0) {
            return (results.map((company, index) => {
                return <CompanyCard key={index} company={company} />
            }
            ))
        }
    }

    return (
        <div>
            <Header />
            <SearchBar onSearch={buscar} />
            { results.length === 0 ? <CategoryCards /> : <Contenido />}
            { results.length === 0 ? <MapButton /> : <Row> </Row>}
        </div>
    );
};

export default HomePage;
