import {Bar} from "react-chartjs-2";
import React from "react";

let empresas = ["Hiberus", "Sysdig", "Nologin", "Everis", "Adidas"];
let reservas = [321, 421, 324, 324, 543]

const data = {
    labels: empresas,
    datasets: [
        {
            label: '# de Reservas',
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
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
    title: {
        display: true,
        text: "Empresas con más reservas"

    },
    legend: {
        display: false
    }
}

function TopCompaniesBar() {
    return (
        <Bar data={data} options={options}/>
    )
}

export default TopCompaniesBar;
