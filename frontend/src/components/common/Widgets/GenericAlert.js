import React from 'react'
import { Alert, Row } from "react-bootstrap";


const GenericAlert = (props) => {
    return (
            <Alert variant={props.tipo}>
                {props.mensaje}
            </Alert>)
}




export default GenericAlert;