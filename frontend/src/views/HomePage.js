import React from "react";
import RegistrarNegocioButton from "../components/common/Buttons/RegistrarNegocioButton";
import Header from "../components/common/Headers/Header";
import SearchBar from "../components/common/Bars/SearchBar";
import CategoryCards from "../components/common/Buttons/CategoryCards";
import MapButton from "../components/common/Buttons/MapButton"
import { Container } from "react-bootstrap";


const HomePage = () => {
    return (
        <div>
            <Header />
            <SearchBar />
            <CategoryCards />
            <MapButton />
        </div>
    );
};

export default HomePage;
