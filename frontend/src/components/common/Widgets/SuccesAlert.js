import React from 'react'
import { Alert } from "react-bootstrap";


const SuccesAlert = (props) => {
    if (props.apiError) {
        return (<Alert variant="success">
            Operación exitosa
        </Alert>)
    } else return null
}




export default SuccesAlert;