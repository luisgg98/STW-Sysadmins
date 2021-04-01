import React from 'react';
import RegistrarNegocioButton from '../common/Buttons/RegistrarNegocio';
import Header from "../common/Headers/Header"
import HomeSlogan from '../common/PlainText/HomeSlogan';
import SearchBar from "../common/Bars/SearchBar";
import CategoryCards from "../common/Buttons/CategoryCards";


const HomePage = () => {

    return (
        <div >
            <Header /> 
            <HomeSlogan />
            <RegistrarNegocioButton />
            <SearchBar />
            <CategoryCards />
        </div>
    )
}

export default HomePage;