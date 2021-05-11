import React, {useEffect, useState} from 'react';
import {Calendar} from 'antd';
import '../../../index.css'
import 'antd/dist/antd.css'
import moment from 'moment'
import {Button, Col, Container, Row} from "react-bootstrap";
import {getCompanyOpinions} from "../../../services/OpinionsService";
import {getServiceBookings} from "../../../services/CompaniesService";
import GenericAlert from "./GenericAlert";

const CalendarWidget = (props) => {
    const {service, company} = props;
    const [dates, setDates] = useState({weekday: "", date: ""})
    console.log("calendar widget serice", service)
    console.log("calendar widget comp", company)

    const [error, setError] = useState(false)

    async function fetchBooking() {
        if (company !== undefined && service !== undefined) {
            const resp = await getServiceBookings(company.nif, service.services._id).then(
                resp => {
                    if (resp === []) {
                        setError(true)
                    } else console.log("respuesta", resp)
                }
            )
        }
    }

    var days1 = ['monday_1', 'tuesday_1', 'wednesday_1', 'thursday_1', 'friday_1', 'saturday_1', 'sunday_1'];
    var days2 = ['monday_2', 'tuesday_2', 'wednesday_2', 'thursday_2', 'friday_2', 'saturday_2', 'sunday_2'];


    const [mostrar, setMostrar] = useState([])
    const [hora, setHora] = useState()
    useEffect(() => {
        const first = days1[dates.weekday]
        const second = days2[dates.weekday]
        setHora(undefined)
        setMostrar([])
        console.log("weekday", dates.weekday)
        Object.keys(company.time_slots).forEach((key) => {

            if (key === first || key == second) {
                console.log(key);
                console.log(company.time_slots[key]);
                // mostrar.concat(company.time_slots[key]);
                company.time_slots[key].map(
                    (value) =>{
                        setMostrar( prevState => [ ...prevState, value])
                    }
                )

            }
        })
        console.log("mostrar,", mostrar)
        const resp = fetchBooking();

    }, [dates]);

    const [value, setValue] = useState()
    const CalendarCol = () => {
        return (
            <Row className="justify-content-center">
                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                    <Calendar
                        fullscreen={false}
                        validRange={[moment(), moment([2022, 1, 1])]}
                        value={value}
                        onSelect={(value) => {
                            setValue(value)
                            setDates({
                                date: value.toDate(),
                                weekday: value.weekday(),
                                mom: value
                            })
                        }}

                    />
                </Col>
            </Row>
        )
    }


    const Huecos = () => {
        if (mostrar !== [])
            return (mostrar.map(
                (value, key) => {
                    return (
                        <Col key={key} xs={2} sm={2} md={2} lg={2} xl={2} className="mx-2 my-2" >
                            <Button type="button" variant="success" onClick={() => {setHora(value)}}> {value}</Button>
                        </Col>)
                }
            ))

    }
    return (
        <Container fluid className="mx-5">
            <h3 className="text-center">ELIGE EL DIA DE LA RESERVA</h3>
            <CalendarCol/>
            <Row className="justify-content-around">
                {dates.weekday !== "" &&
                <Huecos />}
                {error && <GenericAlert tipo="danger" mensaje="Error con los datos de reserva"/>}
            </Row>
            {hora!= undefined && <Row className="justify-content-center mx-5 text-center">
                <h3>Usted ha elegido la reserva el dia
                    {dates.mom.toDate().toString()} a las {hora.toString().substring(0,16)}. </h3>
            </Row>}

        </Container>
    )

}

export default CalendarWidget;