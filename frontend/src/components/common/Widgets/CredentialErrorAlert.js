import React from 'react'
import { Alert } from "react-bootstrap";


const CredentialErrorAlert = (props) => {
    if (props.apiError) {
        return (<Alert variant="danger">
            Credenciales incorrectas
        </Alert>)
    } else return null
}




export default CredentialErrorAlert;