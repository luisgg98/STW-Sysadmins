import React from "react";
import Header from "../components/common/Headers/Header";
import SearchBar from "../components/common/Bars/SearchBar";
import CategoryCards from "../components/common/Buttons/CategoryCards";
import { Container } from "react-bootstrap";


const HomePage = () => {
    return (
        <div>
            <Header />
            <SearchBar />
            <CategoryCards />
        </div>
    );
};

export default HomePage;
