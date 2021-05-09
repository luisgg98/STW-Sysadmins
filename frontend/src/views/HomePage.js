import React, {useState} from "react";
import Header from "../components/common/Headers/Header";
import SearchBar from "../components/common/Bars/SearchBar";
import CategoryCards from "../components/common/Widgets/CategoryCards";
import MapButton from "../components/common/Widgets/MapButton"
import {Card, Container, Row} from "react-bootstrap";
import CompanyCard from "../components/common/Widgets/CompanyCards";
import {searchCompanies} from "../services/CompaniesService"
import PageDescription from "../components/common/Widgets/PageDescription";
import RegistrarNegocioButton from "../components/common/Widgets/RegistrarNegocioButton";
import Footer from "../components/common/Footers/Footer";

const HomePage = () => {

    const [results, setResults] = useState([]);

    const buscar = async (texto, e) => {
        console.log("buscar ", texto)
        try {
            const result = await searchCompanies(texto)
            setResults(result)
            console.log("result buscar", result)
        } catch (error) {
            console.log(error)
        }
    }


    const Contenido = () => {
        if (results.length !== 0) {
            return (results.map((company, index) => {
                    return <CompanyCard key={index} company={company}/>
                }
            ))
        }
    }

    return (
        <div>
            <Header/>
            <Container fluid>
                <Row className="justify-content-center">
                    <PageDescription/>
                </Row>
                <Row className="p-2">
                    <RegistrarNegocioButton/>
                </Row>
                <Row>
                    <SearchBar onSearch={buscar}/>
                    <Container>
                        {results.length === 0 ? <CategoryCards/> : <Contenido/>}
                    </Container>
                </Row>
                <Row>
                    {results.length === 0 ? <MapButton/> : <Row> </Row>}
                </Row>
            </Container>
            <Footer children={<div>Iconos diseñados por <a href="https://www.freepik.com"
                                                           title="Freepik">Freepik</a> from <a
                href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>}>

            </Footer>

        </div>
    );
};

export default HomePage;
