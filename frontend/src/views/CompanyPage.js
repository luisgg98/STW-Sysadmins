import React, {useEffect, useState} from "react";
import ZitationHeader from "../components/common/Headers/Header";
import SearchBar from "../components/common/Bars/SearchBar";
import CompanyCard from "../components/common/Widgets/CompanyCards";
import {Row} from "react-bootstrap";
import LoadingSpinner from "../components/common/Widgets/LoadingSpinner"
import {getCompaniesByCategory} from "../services/CompaniesService";
import Header from "../components/common/Headers/Header";

const CompanyPage = (props) => {
    const {tipo, search} = props

    const [loading, setLoading] = useState(true);

    // const [companies, setCompanies] = useState({});
    const [companies, setCompanies] = useState();


    useEffect(() => {
        console.log('use effect');
        // console.log(props)
        // Actualiza el título del documento usando la API del navegador
        // getData();
        async function fetch() {
            if (search.length === 0) {
                setLoading(true)
                // console.log("search if" , search)
                const data = await getCompaniesByCategory(tipo)
                // console.log("company page data recevied: ",  data)
                setCompanies({content: data})
                setLoading(false)
            } else {
                // console.log("search else" , search)
                setCompanies(search)
            }
        }

        fetch()
    }, [search, tipo]);

    const Contenido = () => {
        let existe = companies.content.some(item => item.category === tipo)
        if (!loading) {
            if (existe)
                return (companies.content.map((company, index) => {
                        // console.log("tipo", tipo)
                        // console.log("cate", company.category)
                        if (company.category === tipo) {
                            return <CompanyCard key={index} company={company}/>
                        } else return null
                    }
                ))
            else return <Row className="justify-content-center mx-auto display-4"> Todavía no disponemos empresas en
                esta categoria</Row>
        }
    }

    const AllContenido = () => {
        if (!loading)
            return (companies.content.map((company, index) => {
                    return <CompanyCard key={index} title={company.name}/>
                }
            ))
    }

    const Content = () => {
        if (loading) {
            return (
                <LoadingSpinner/>
            )
        } else {
            if (tipo !== "") {
                return <Contenido/>
            } else
                return <AllContenido/>

        }
    }

    return (
        // getData(),
        <div>
            <Header/>
            <SearchBar/>
            <Content/>
        </div>
    );
};

export default CompanyPage;
