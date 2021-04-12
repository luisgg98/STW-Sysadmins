import React, { useEffect, useState } from "react";
import ZitationHeader from "../components/common/Headers/Header";
import SearchBar from "../components/common/Bars/SearchBar";
import { API } from "../services/AuthService"
import CompanyCard from "../components/common/Buttons/CompanyCards";
import axios from 'axios';
import { Row, Spinner } from "react-bootstrap";

const HealthPage = () => {

    const [loading, setLoading] = useState(true);

    // const [companies, setCompanies] = useState({});
    const [companies, setCompanies] = useState();

    axios.interceptors.request.use((config) => {
        // console.log(config);
        return config;
    },
        function (error) {
            return Promise.reject(error);
        });



    const getData = async () => {
        console.log('fetching data');
        let data = {};
        let response = {};
        try {
            response = await axios.get(API + '/companies/',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        } catch (e) {
            console.log('catch error');
            console.log("error", e)

        }
        if (response.status === 200) {
            data = response.data
            console.log("companies", companies);
            setCompanies({ data });
        }
        else {
            console.log("error 40x");
        }
        setLoading(false);
    }

    useEffect(() => {
        console.log('use effect');
        // Actualiza el título del documento usando la API del navegador
        // getData();
        let data = {};
        let response = {};
        try {
            response = axios.get(API + '/companies/',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        if (response.status === 200) {
                            console.log('fetched correctly');
                            data = response.data;
                            setCompanies({ content: data })
                        }
                        else {
                            console.log('fetchedk wron', response.status)
                        }
                        setLoading(false);
                    }

                )
        } catch (e) {
            console.log('catch error');
            console.log("error", e)

        }
    }, []);


    const LoadingSpinner = () => {
        return (
            <Row className=" justify-content-center mx-auto pb-3" >
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner></Row>)
    }

    const Contenido = () => {
        if (!loading) {
            return (companies.content.map((company) => 
                // return (
                    <CompanyCard title={company.name} />
                // );
            ))
        }
    }

    const Content = () => {
        if (loading) {
            return (
                <LoadingSpinner />
            )
        }
        else {
            console.log(companies);
            // return (companies.content.map(x => {
            //     console.log(x);
            //     <CompanyCard comp={x} />
            // }))
            return <Contenido />
        }
    }

    return (
        // getData(),
        <div>
            < ZitationHeader />
            <SearchBar />
            <Content />
        </div>
    );
};

export default HealthPage;
