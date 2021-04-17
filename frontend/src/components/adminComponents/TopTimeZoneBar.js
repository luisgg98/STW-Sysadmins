import React from 'react';
import {HorizontalBar} from "react-chartjs-2";

let timeZones = ["9:00-9:30", "9:30-10:00", "10:00-10:30", "10:30-11:00", "11:00-11:30"];
let reservas = [3211, 4221, 4124, 3214, 2543]

const data = {
    labels: timeZones,
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
        text: "Franjas horarias con más reservas"

    },
    legend: {
        display: false
    }
}

const TopTimeZoneBar = () => {
    return (
        <HorizontalBar data={data} options={options}/>
    );
};

export default TopTimeZoneBar;
