import React from 'react';
import { Card } from 'react-bootstrap';

const HomeSlogan = () => {
    return (
        <Card className="mt-3" textAlign="center" bg="light" >
            <Card.Text>
                ¿Tienes un negocio y quieres ofrecer un servicio de cita previa sin complicarte?
                ¿Quieres evitar hacer colas y reservar cita previa en los locales que frecuentas?
                ¡En ese caso Zitation es tu web!
            </Card.Text>
            <Card.Link href="/registrarNegocio">
                Registrate ahora como negocio!
            </Card.Link>
            <Card.Link href="/registro">
                Registrarte como usuario!
            </Card.Link>
        </Card>
    )
}

export default HomeSlogan;