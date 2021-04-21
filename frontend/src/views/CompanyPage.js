import React, { useEffect, useState } from "react";
import ZitationHeader from "../components/common/Headers/Header";
import SearchBar from "../components/common/Bars/SearchBar";
import CompanyCard from "../components/common/Widgets/CompanyCards";
import axios from '../services/APICall'
import { Row, Spinner } from "react-bootstrap";
import LoadingSpinner from "../components/common/Widgets/LoadingSpinner"

const CompanyPage = (props) => {

    const [loading, setLoading] = useState(true);

    // const [companies, setCompanies] = useState({});
    const [companies, setCompanies] = useState();


    useEffect(() => {
        console.log('use effect');
        console.log(props)
        // Actualiza el título del documento usando la API del navegador
        // getData();
        if (props.search.length ===0) {
            console.log("search if" , props.search)
            let data = {};
            try {
                axios.get('/companies/',
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
                                console.log('fetched wrong', response.status)
                            }
                            setLoading(false);
                        }

                    )
            } catch (e) {
                console.log('catch error');
                console.log("error", e)

            }
        }
        else {
            console.log("search else" , props.search)
            setCompanies(props.search)
        }
    }, []);


    // const LoadingSpinner = () => {
    //     return (
    //         <Row className=" justify-content-center mx-auto pb-3" >
    //             <Spinner animation="border" role="status">
    //                 <span className="sr-only">Loading...</span>
    //             </Spinner>
    //         </Row>)
    // }

    const Contenido = () => {
        let existe = companies.content.some(item => item.category === props.tipo)
        if (!loading) {
            if (existe)
                return (companies.content.map((company, index) => {
                    console.log("tipo", props.tipo)
                    console.log("cate", company.category)
                    if (company.category === props.tipo) {
                        console.log("if");
                        return <CompanyCard key={index} title={company.name} />
                    }
                    else return null
                }
                ))
            else return <Row className="justify-content-center mx-auto display-4"> Todavía no disponemos empresas en esta categoria</Row>
        }
    }

    const AllContenido = () => {
        if (!loading)
                return (companies.content.map((company, index) => {
                        return <CompanyCard key={index} title={company.name} />
                    }
                ))
    }

    const Content = () => {
        if (loading) {
            return (
                <LoadingSpinner />
            )
        }
        else {
            if (props.tipo !== ""){
                return <Contenido />
            }
            else 
                return <AllContenido />
            
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

export default CompanyPage;
