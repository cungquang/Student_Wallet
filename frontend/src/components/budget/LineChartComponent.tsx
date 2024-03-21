import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, 
    LineElement, 
    CategoryScale,  //x axis 
    LinearScale,    //y axis
    PointElement,
} from 'chart.js';

//Need to register -> otherwise error in rendering
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);

interface LineChartProps {
    labels: string[];
    inputData: number[];
}

const LineChartComponent: React.FC<LineChartProps> = ({ labels, inputData }) =>  {
    const data = {
        labels: labels,
        datasets: [{
            labels: 'Cost of the Week',
            data: inputData,
            backgroundColor: 'red',
            borderColor: 'black',
            pointBorderColor: 'red',
            fill: true,
            borderWidth: 2,
            tension: 0.4
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
                }
            }
        }
    };

    return (
        <div style={{ width: '600px', height: '250px', margin: 'auto' }}>
            <Line data = {data}  options={options} />
        </div>
    );
}

export default LineChartComponent;
