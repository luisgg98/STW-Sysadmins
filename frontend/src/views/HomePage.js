import React from "react";
import RegistrarNegocioButton from "../components/common/Buttons/RegistrarNegocio";
import Header from "../components/common/Headers/Header";
import HomeSlogan from "../components/common/PlainText/HomeSlogan";
import SearchBar from "../components/common/Bars/SearchBar";
import CategoryCards from "../components/common/Buttons/CategoryCards";

const HomePage = () => {
    return (
        <div>
            <Header />
            <HomeSlogan />
            <RegistrarNegocioButton />
            <SearchBar />
            <CategoryCards />
        </div>
    );
};

export default HomePage;
