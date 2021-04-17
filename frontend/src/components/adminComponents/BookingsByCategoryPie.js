import React from 'react'
import {Pie} from "react-chartjs-2";

let categorias = ["Salud y Belleza", "Deporte", "Ocio", "Administración Pública", "Comercio"]
let reservas = [321, 421, 4124, 3214, 543]

const data = {
    labels: categorias,
    datasets: [
        {
            label: '# de reservas',
            data: reservas,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
}
const options = {
    title: {
        display: true,
        text: "Reservas por categorías"
    }
}

const BookingsBycategoriePie = () => (
    <Pie data={data} options={options}/>
)

export default BookingsBycategoriePie
