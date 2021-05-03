import React, {useState, useEffect } from 'react'
import { getCompanyData } from '../../../services/CompaniesService'
import{useParams } from 'react-router-dom'

const CompanyData = (props) => {


    const {nif} = useParams()
    console.log("nif", nif)

    useEffect(async () => {
        //get company info
        const data = await getCompanyData(nif)
        console.log("data")
    }, [])

    return (
        <div>   </div>
    )   
}

export default CompanyData;