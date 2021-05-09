import {Card} from "react-bootstrap";
import React from "react";

const PageDescription = () => {
    return (
        <Card bg="Light" className="text-center" border={'white'.toLowerCase()}>
            <Card.Body>
                <Card.Text>
                    ¿Tienes un negocio y quieres ofrecer un servicio de cita previa sin complicarte?<br/>
                    ¿Quieres evitar hacer colas y reservar cita previa en los locales que frecuentas?<br/>
                    ¡En ese caso Zitation es tu web!
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default PageDescription;
