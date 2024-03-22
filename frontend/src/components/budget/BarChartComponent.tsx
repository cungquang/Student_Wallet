import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
);

interface BarChartProps {
    labelsData: string[];
    inputData: number[];
}

const BarChartComponent: React.FC<BarChartProps> = ({ labelsData, inputData }) =>  {
    const data = {
        labels: labelsData,
        datasets: [{
            label: 'Cost of the Week',
            data: inputData,
            backgroundColor: '#FFA500',
            borderColor: 'black',
            borderWidth: 1
        }]
    };

    const options = {
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            y: {
                grid: {
                    display: false
                },
                beginAtZero: true // Ensure the y-axis starts at zero
            }
        }
    };

    return (
        <div style={{ width: '600px', height: '250px', margin: 'auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

export default BarChartComponent;
