import React, { useState } from 'react';
import axios from 'axios';
import BarChartComponent from './BarChartComponent';

const GET_DATA_URL = ""
const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthLabels = ['Week1', 'Week2', 'Week3', 'Week4'];
const { startOfWeek, endOfWeek } = getStartAndEndDateOfWeek();
const { startOfMonth, endOfMonth } = getStartAndEndDateOfMonth();

interface DisplayGraphProps {
    byUser: string;
    containerClassName?: string;
}

const DisplayGraphComponent: React.FC<DisplayGraphProps> = ( { byUser, containerClassName }) => {
    const [scaleLabels, setScaleDataLabels] = useState<string[]>(weekLabels);
    const [startDate, setStartDate] = useState<string>(startOfWeek);
    const [endDate, setEndDate] = useState<string>(endOfWeek);
    const [inputData, setInputData] = useState<number[]>()
    
    const data = [1, 2, 3, 5, 6, 8, 3, 1];

    const handleWeekClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setScaleDataLabels(weekLabels);
        setStartDate(startOfWeek);
        setEndDate(endOfWeek);
    };

    const handleMonthClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setScaleDataLabels(monthLabels);
        setStartDate(startOfMonth);
        setEndDate(endOfMonth);
    };

    const handleRefreshClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        //Update the scale as need

        //Pull the data:
        // const res_getData = await axios.get(GET_DATA_URL, {
        //     params: {
        //       userId: byUser,
        //       startDate: startDate,
        //       endDate: endDate
        //     }
        // });
        console.log(scaleLabels);
        console.log(startDate);
        console.log(endDate);
    };
    
    return(
        <div>
            <div className={containerClassName}>
                <div className="button-wrapper">
                    <button type='submit' onClick={handleWeekClick}>Week</button>
                </div>
                <div className="button-wrapper">
                    <button type='submit' onClick={handleMonthClick}>Month</button>
                </div>
                <div className="button-wrapper">
                    <button type='submit' onClick={handleRefreshClick}>
                        <img src="/refreshIcon.JPG" alt="Refresh" style={{ width: '18px', height: '16px' }} /> 
                    </button>
                </div>
            </div>
            <br/>
            <BarChartComponent labelsData={scaleLabels} inputData={data}/>
        </div>
    );
}

///////////////////////////// SUPPORT /////////////////////////////


function getDayOfWeek(date: Date): string {
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

function getDayOfMonth(date: Date): number {
    const days = date.getDate(); // Returns the day of the month (1-31)
    return days % 4
}

//Source: ChatGPT
function getStartAndEndDateOfWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay(); 

    // Calculate the start date of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    const formattedStartOfWeek = startOfWeek.toISOString().split('T')[0];

    // Calculate the end date of the week (Saturday)
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));
    const formattedEndOfWeek = endOfWeek.toISOString().split('T')[0];

    return { startOfWeek: formattedStartOfWeek, endOfWeek: formattedEndOfWeek };
}

//Source: ChatGPT
function getStartAndEndDateOfMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Calculate the start date of the month
    const startOfMonth = new Date(year, month, 1);
    const formattedStartDate = startOfMonth.toISOString().split('T')[0];

    // Calculate the end date of the month
    const endOfMonth = new Date(year, month + 1, 0);
    const formattedEndDate = endOfMonth.toISOString().split('T')[0];

    return { startOfMonth: formattedStartDate, endOfMonth: formattedEndDate };
}


export default DisplayGraphComponent;